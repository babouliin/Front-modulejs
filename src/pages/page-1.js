/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Layout from '../component/layout';
import '../assets/scss/pages/_page-1.css';

const PageOne = () => {
  const [AllUserDiscussion] = useState([]);
  const [AllMessage] = useState([]);

  // useEffect(() => setState(isLogin()), [props]);

  const OneUserDiscusion = (element) => (
    <li className="person" data-chat={element.id}>
      <div className="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="Retail Admin" />
        <span className={element.status} />
      </div>
      <p className="name-time">
        <span className="name">{element.name}</span>
        <span className="time">{element.time}</span>
      </p>
    </li>
  );

  const AllUserDiscussionPart = () => {
    const discussionTable = [];

    if (AllUserDiscussion) {
      AllUserDiscussion.forEach((element) => {
        discussionTable.push(OneUserDiscusion(element));
      });
    }

    return (
      <ul className="users">
        {discussionTable}
      </ul>
    );
  };

  const oneMessage = (element) => (
    <li className={element.isRespond ? 'chat-left' : 'chat-right'}>
      <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin" />
        <div className="chat-name">{element.name}</div>
      </div>
      <div className="chat-text">
        {element.message}
      </div>
      <div className="chat-hour">
        {element.hour}
        <span className="fa fa-check-circle" />
      </div>
    </li>
  );

  const AllMessagePart = () => {
    const messageTable = [];

    if (AllMessage) {
      AllMessage.forEach((element) => {
        messageTable.push(oneMessage(element));
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
