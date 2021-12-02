/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Layout from '../component/layout';
import '../assets/scss/pages/_page-1.css';

const PageOne = () => {
  const [AllUserDiscussion] = useState([]);
  const [AllMessage] = useState([]);

  // useEffect(() => setState(isLogin()), [props]);

  const OneUserDiscusion = (id, status, name, time) => (
    <li className="person" data-chat={id}>
      <div className="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="Retail Admin" />
        <span className={status} />
      </div>
      <p className="name-time">
        <span className="name">{name}</span>
        <span className="time">{time}</span>
      </p>
    </li>
  );

  const AllUserDiscussionPart = () => {
    const discussionTable = [];

    if (AllUserDiscussion) {
      AllUserDiscussion.forEach((id, status, name, time) => {
        discussionTable.push(OneUserDiscusion(id, status, name, time));
      });
    }

    return (
      <ul className="users">
        {discussionTable}
      </ul>
    );
  };

  const oneMessage = (isRespond, name, message, hour) => (
    <li className={isRespond ? 'chat-left' : 'chat-right'}>
      <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin" />
        <div className="chat-name">{name}</div>
      </div>
      <div className="chat-text">
        {message}
      </div>
      <div className="chat-hour">
        {hour}
        <span className="fa fa-check-circle" />
      </div>
    </li>
  );

  const AllMessagePart = () => {
    const messageTable = [];

    if (AllMessage) {
      AllMessage.forEach((isRespond, name, message, hour) => {
        messageTable.push(oneMessage(isRespond, name, message, hour));
      });
    }

    return (
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div className="selected-user">
          <span>
            To:
            <span className="name">Emily Russell</span>
          </span>
        </div>
        <div className="chat-container">
          <ul className="chat-box chatContainerScroll">
            {messageTable}
          </ul>
          <div className="form-group mt-3 mb-0">
            <textarea className="form-control" rows="3" placeholder="Type your message here..." />
          </div>
        </div>
      </div>
    );
  };

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
                          <input className="form-control" placeholder="Search" />
                          <div className="input-group-btn">
                            <button type="button" className="btn btn-info">
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {AllUserDiscussionPart()}
                    </div>
                  </div>
                  {AllMessagePart()}
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
