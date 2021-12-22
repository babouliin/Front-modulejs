import { React, useRef, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';
import ChannelMessageSelector from '../store/ChannelMessageSelector';
import addChannelMessage from '../store/ChannelMessageAction';

function MessageItem({ Message }) {
  return (
    <li className={Message.isRespond ? 'chat-left' : 'chat-right'}>
      <div className="chat-avatar">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin" />
        <div className="chat-name">{Message.name}</div>
      </div>
      <div className="chat-text">
        {Message.message}
      </div>
      <div className="chat-hour">
        {Message.hour}
        <span className="fa fa-check-circle" />
      </div>
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
  const textarea = useRef(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(addChannelMessage('Thomas', textarea.current.value));
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
    </form>
  );
}

function ChannelMessageStore() {
  const channelMessage = useSelector(ChannelMessageSelector);
  return (
    <Layout className="app-camearadetails" isHeader>
      <h1>Welcome to Home Two</h1>
      <Link to="/home">Home</Link>
      <Link to="/page-1" className="ml-3">Page_One</Link>
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
    </Layout>
  );
}

export default ChannelMessageStore;
