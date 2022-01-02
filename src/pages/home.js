import React from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import Layout from '../component/Layout';
import APIMessage from '../API/APIMessage';
import ChannelMessageStore from '../component/ChannelMessage';
import UserDiscussionsListStore from '../component/UserDiscussionsList';
import AddUserDiscussion from '../component/AddUserDiscussion';
import MessageUserSelectedSelector from '../store/MessageUserSelectedSelector';
import { addUserDiscussion, updateUserDiscussion } from '../store/UserDiscussionsAction';
import addChannelMessage, { updateChannelMessage } from '../store/ChannelMessageAction';
import { updateMessageUserSelected } from '../store/MessageUserSelectedAction';
import socket from '../socket';
import updateUserList from '../store/UserListAction';

import '../assets/scss/pages/_page-1.css';

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(['user']);
  const messageUserSelected = useSelector(MessageUserSelectedSelector);

  socket.auth = { token: `Bearer ${cookies.Token}` };
  socket.connect();

  socket.on('connect_error', (err) => {
    if (err.message === 'invalid username') {
      socket.off('connect_error');
      message.error(t('socketFailed'));
    }
  });

  socket.on('session', (sessionId) => {
    setCookie('SessionId', sessionId.sessionId, { path: '/' });
  });

  // LoadUsers
  socket.on('users', async (users) => {
    await dispatch(updateUserList(users.users));
  });

  // LoadChats
  socket.on('chats', async (chats) => {
    await dispatch(updateUserDiscussion(chats.chats));
  });

  socket.off('new chat').on('new chat', async (chat) => {
    await dispatch(addUserDiscussion(chat.id, chat.other_user.pseudo, chat.other_user.id));
    if (chat.isEmitter) {
      await dispatch(
        updateMessageUserSelected(
          chat.id, chat.other_user.id, chat.other_user.pseudo,
        ),
      );
      const messagesReturn = await APIMessage.messages(chat.id);
      if (messagesReturn) {
        const { data } = messagesReturn;
        if (messagesReturn.status === 200) {
          await dispatch(updateChannelMessage(data.data));
        } else {
          await dispatch(updateChannelMessage([]));
        }
      } else {
        message.error(t('serverUnreachable'));
      }
    }
  });

  socket.off('private message').on('private message', async (mess) => {
    if (mess.chat_id === messageUserSelected.chatId) {
      await dispatch(addChannelMessage(
        mess.id, messageUserSelected.pseudo, mess.content, mess.from_user, mess.to_user,
      ));
    }
  });

  return (
    <Layout className="" isHeader>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container">
        <div className="page-title">
          <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 className="title">{t('letsChat')}</h5>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card m-0">
                <div className="row no-gutters">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                    <div className="users-container">
                      <AddUserDiscussion />
                      <UserDiscussionsListStore />
                    </div>
                  </div>
                  <ChannelMessageStore />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
