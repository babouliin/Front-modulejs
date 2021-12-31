/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import Layout from '../component/Layout';
import APIChat from '../API/APIChat';
import APIMessage from '../API/APIMessage';
import APIUser from '../API/APIUser';
import ChannelMessageStore from '../component/ChannelMessage';
import UserDiscussionsListStore from '../component/UserDiscussionsList';
import AddUserDiscussion from '../component/AddUserDiscussion2';
import MessageUserSelectedSelector from '../store/MessageUserSelectedSelector';
import { addUserDiscussion, updateUserDiscussion } from '../store/UserDiscussionsAction';
import addChannelMessage, { updateChannelMessage } from '../store/ChannelMessageAction';
import socket from '../socket';
import { logout } from '../middleware/auth';
import updateUserList from '../store/UserListAction';

import '../assets/scss/pages/_page-1.css';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  const messageUserSelected = useSelector(MessageUserSelectedSelector);

  socket.auth = { token: `Bearer ${cookies.Token}` };
  socket.connect();

  socket.on('connect_error', (err) => {
    if (err.message === 'invalid username') {
      socket.off('connect_error');
      logout();
    }
  });

  socket.on('session', (sessionId) => {
    console.log(sessionId.sessionId);
    setCookie('SessionId', sessionId.sessionId, { path: '/' });
  });

  // LoadUsers
  socket.on('users', async (users) => {
    console.log(users.users);
    await dispatch(updateUserList(users.users));
  });

  // LoadChats
  socket.on('chats', async (chats) => {
    console.log(chats.chats);
    await dispatch(updateUserDiscussion(chats.chats));
  });

  socket.on('new chat', async (chat) => {
    console.log('new chat');
    console.log(chat);
    await dispatch(addUserDiscussion(chat.id, chat.other_user.pseudo, chat.other_user.id));
  });

  socket.on('private message', async (mess) => {
    console.log('private message');
    console.log(mess);
    if (mess.chat_id === messageUserSelected.chatId) {
      await dispatch(addChannelMessage(messageUserSelected.pseudo, mess.content));
    }
  });

  return (
    <Layout className="app-camearadetails" isHeader>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div classNameName="container">
        <div className="page-title">
          <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 className="title">Chat App</h5>
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
