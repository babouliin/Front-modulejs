import React from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import Layout from '../component/Layout';
import APIChat from '../API/APIChat';
import APIMessage from '../API/APIMessage';
import ChannelMessageStore from '../component/ChannelMessage';
import UserDiscussionsListStore from '../component/UserDiscussionsList';
import { updateUserDiscussion } from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';

import '../assets/scss/pages/_page-1.css';

const PageOne = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loadUserDiscussionsList = (async () => {
    const chatReturn = await APIChat.chats();
    const { data } = chatReturn;
    if (chatReturn.status === 200) {
      console.log(data);
      await dispatch(updateUserDiscussion(data));
    } else {
      message.error(`Error ${data.message}`);
    }
  });

  // eslint-disable-next-line no-unused-vars
  const loadChannelMessage = (async () => {
    const messageReturn = await APIMessage.messages();
    const { data } = messageReturn;
    if (messageReturn.status === 200) {
      console.log(data);
      await dispatch(updateChannelMessage(data));
    } else {
      message.error(`Error ${data.message}`);
    }
  });

  // useEffect(() => setState(isLogin()), [props]);

  loadUserDiscussionsList();
  // loadChannelMessage();

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
                      <div className="chat-search-box">
                        <div className="input-group">
                          <input className="form-control" placeholder={t('search')} />
                          <div className="input-group-btn">
                            <button type="button" className="btn btn-info">
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
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
