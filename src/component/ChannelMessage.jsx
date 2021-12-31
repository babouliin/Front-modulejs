/* eslint-disable no-unused-vars */
import { React, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import socket from '../socket';
import ChannelMessageSelector from '../store/ChannelMessageSelector';
import MessageUserSelectedSelector from '../store/MessageUserSelectedSelector';
import addChannelMessage from '../store/ChannelMessageAction';

function MessageItem({ Message }) {
  return (
    <li className={Message.isRespond ? 'chat-left' : 'chat-right'}>
      <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin" />
        <div className="chat-name">{Message.pseudo}</div>
      </div>
      <div className="chat-text">
        {Message.content}
      </div>
      {/* <div className="chat-hour">
        {Message.hour}
        <span className="fa fa-check-circle" />
      </div> */}
    </li>
  );
}

MessageItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Message: PropTypes.object.isRequired,
};

function ChannelMessageList({ channelMessage }) {
  return (
    <ul className="chat-box chatContainerScroll">
      { channelMessage && channelMessage.map((Message) => (
        <MessageItem
          Message={Message}
          key={Message.id}
        />
      ))}
    </ul>
  );
}

ChannelMessageList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  channelMessage: PropTypes.array.isRequired,
};

function AddChannelMessage() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['user']);
  const textarea = useRef(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const messageUserSelected = useSelector(MessageUserSelectedSelector);

  const handleSubmit = (async (e) => {
    e.preventDefault();
    setLoading(true);
    const content = textarea.current.value;
    console.log('handleSubmit');
    console.log(messageUserSelected.chatId);
    console.log(content);
    console.log(messageUserSelected.userId);
    console.log(cookies.SessionId);
    socket.auth = {
      token: `Bearer ${cookies.Token}`,
      sessionId: `${cookies.SessionId}`,
    };
    socket.emit('private message', {
      chatId: messageUserSelected.chatId,
      content,
      toUserId: messageUserSelected.userId,
    });
    await dispatch(addChannelMessage(messageUserSelected.pseudo, textarea.current.value));
    setLoading(false);
    textarea.current.value = '';
    textarea.current.focus();
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-3 mb-0">
        <textarea ref={textarea} className="form-control" rows="3" placeholder={t('enterYourMessage')} />
        {loading && t('loadingWaiting')}
      </div>
      <div className="input-group-btn">
        <button type="button" disabled={loading} onClick={handleSubmit} className="btn btn-info mt-3 mb-3 float-end">
          <i className="fa fa-play" />
        </button>
      </div>
    </form>
  );
}

function ChannelMessageStore() {
  const channelMessage = useSelector(ChannelMessageSelector);
  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
      <div className="selected-user">
        <span>
          To:
          <span className="name">Emily Russell</span>
        </span>
      </div>
      <div className="chat-container">
        <ChannelMessageList channelMessage={channelMessage} />
        <AddChannelMessage />
      </div>
    </div>
  );
}

export default ChannelMessageStore;
