import { React, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import APIUser from '../API/APIUser';
import socket from '../socket';
import ChannelMessageSelector from '../store/ChannelMessageSelector';
import MessageUserSelectedSelector from '../store/MessageUserSelectedSelector';
import addChannelMessage from '../store/ChannelMessageAction';

function MessageItem({ isRespond, pseudo, content }) {
  return (
    <li className={isRespond ? 'chat-left' : 'chat-right'}>
      <div className="chat-avatar">
        <img src={isRespond ? 'https://www.bootdey.com/img/Content/avatar/avatar3.png' : 'https://www.bootdey.com/img/Content/avatar/avatar2.png'} alt="Retail Admin" />
        <div className="chat-name">{pseudo}</div>
      </div>
      <div className="chat-text">
        {content}
      </div>
    </li>
  );
}

MessageItem.propTypes = {
  isRespond: PropTypes.bool.isRequired,
  pseudo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function ChannelMessageList({ channelMessage }) {
  return (
    <ul className="chat-box chatContainerScroll">
      { channelMessage && channelMessage.map((Message) => (
        <MessageItem
          isRespond={Message.isRespond}
          pseudo={Message.pseudo}
          content={Message.content}
          key={Message.id}
        />
      ))}
    </ul>
  );
}

ChannelMessageList.propTypes = {
  channelMessage: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    socket.auth = {
      token: `Bearer ${cookies.Token}`,
      sessionId: `${cookies.SessionId}`,
    };
    socket.emit('private message', {
      chatId: messageUserSelected.chatId,
      content,
      toUserId: messageUserSelected.userId,
    });
    const userReturn = await APIUser.getUser();
    let fromUser = null;
    if (userReturn) {
      const { data } = userReturn;
      if (userReturn.status === 200) {
        fromUser = { id: data.data.id, pseudo: data.data.pseudo };
      } else {
        return;
      }
    } else {
      return;
    }
    if (fromUser !== null) {
      await dispatch(addChannelMessage(
        null, messageUserSelected.pseudo, textarea.current.value, fromUser,
        { id: messageUserSelected.userId, pseudo: messageUserSelected.pseudo },
      ));
    }
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
  const { t } = useTranslation();
  const channelMessage = useSelector(ChannelMessageSelector);
  const messageUserSelected = useSelector(MessageUserSelectedSelector);
  if (messageUserSelected.isChatSelected) {
    return (
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div className="selected-user">
          <span>
            {t('chatTo')}
            <span className="name">{messageUserSelected.pseudo}</span>
          </span>
        </div>
        <div className="chat-container">
          <ChannelMessageList channelMessage={channelMessage} />
          <AddChannelMessage />
        </div>
      </div>
    );
  }
  return (<div> </div>);
}

export default ChannelMessageStore;
