/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import Layout from '../component/Layout';
import APIChat from '../API/APIChat';
import APIMessage from '../API/APIMessage';
import APIUser from '../API/APIUser';
import ChannelMessageStore from '../component/ChannelMessage';
import UserDiscussionsListStore from '../component/UserDiscussionsList';
import AddUserDiscussion from '../component/AddUserDiscussion2';
import { updateUserDiscussion } from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';
import socket from '../socket';
import { logout } from '../middleware/auth';
import updateUserList from '../store/UserListAction';

import '../assets/scss/pages/_page-1.css';

const PageOne = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);

  const loadUserDiscussionsList = (async () => {
    socket.query = { token: cookies.Token };
    socket.on('chats', (chats) => {
      console.log(chats);
      chats.forEach((chat) => {
        // user.self = user.userID === socket.id;
        // initReactiveProperties(user);
        console.log(chat);
      });
    });

    const chatReturn = await APIChat.chats();
    const { data } = chatReturn;
    if (chatReturn.status === 200) {
      console.log(data);
      await dispatch(updateUserDiscussion(data));
    } else {
      message.error(`Error ${data.message}`);
    }
  });

  const loadChannelMessage = (async (chatId) => {
    const messageReturn = await APIMessage.messages(chatId);
    const { data } = messageReturn;
    if (messageReturn.status === 200) {
      console.log(data);
      await dispatch(updateChannelMessage(data));
    } else {
      message.error(`Error ${data.message}`);
    }
  });

  const loadUserList = (async () => {
    socket.query = { token: cookies.Token };
    socket.on('users', (users) => {
      console.log(users);
      users.forEach((user) => {
        // user.self = user.userID === socket.id;
        // initReactiveProperties(user);
        console.log(user);
      });
    });

    const usersReturn = await APIUser.users();
    const { data } = usersReturn;
    if (usersReturn.status === 200) {
      console.log(data.data);
      await dispatch(updateUserList(data.data));
    } else {
      message.error(`Error ${data.message}`);
    }
  });

  socket.on('connect_error', (err) => {
    if (err.message === 'invalid username') {
      socket.off('connect_error');
      logout();
    }
  });

  socket.query = { token: cookies.Token };
  socket.on('session', (sessionId) => {
    console.log(sessionId);
  });

  // loadUserDiscussionsList();
  // loadChannelMessage(1);
  // loadUserList();

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

export default PageOne;
