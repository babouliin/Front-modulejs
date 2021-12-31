/* eslint-disable no-unused-vars */
import {
  React, useCallback,
} from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import socket from '../socket';
import APIMessage from '../API/APIMessage';
import UserDiscussionsSelector from '../store/UserDiscussionsSelector';
import deleteUserDiscussion from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';
import { updateMessageUserSelected } from '../store/MessageUserSelectedAction';

function UserDiscussionItem({ userDiscussion, onDelete }) {
  const dispatch = useDispatch();
  const OnSelect = async (chatId) => {
    console.log('onSelect');
    console.log(userDiscussion.other_user);
    await dispatch(
      updateMessageUserSelected(
        chatId, userDiscussion.other_user.id, userDiscussion.other_user.pseudo,
      ),
    );
    if (chatId != null) {
      const messagesReturn = await APIMessage.messages(chatId);
      if (messagesReturn) {
        const { data } = messagesReturn;
        console.log(data);
        if (messagesReturn.status === 200) {
          console.log(data.data);
          await dispatch(updateChannelMessage(data.data));
        } else {
          await dispatch(updateChannelMessage([]));
        }
      } else {
        message.error('Connexion failed');
      }
    } else {
      await dispatch(updateChannelMessage([]));
    }
  };

  return (
    <div onClick={() => OnSelect(userDiscussion.id)} aria-hidden="true">
      <li className="person" data-chat={userDiscussion.other_user.id}>
        <div className="user">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="Retail Admin" />
          {/* <span className={userDiscussion.status} /> */}
        </div>
        <p className="name-time">
          <span className="name">{userDiscussion.other_user.pseudo}</span>
          {/* <span className="time">{userDiscussion.time}</span> */}
        </p>
        <button className="btn float-end" type="button" onClick={() => onDelete(userDiscussion)}>
          <span className="iconRed">
            <i className="fa fa-minus-circle" />
          </span>
        </button>
      </li>
    </div>
  );
}

UserDiscussionItem.propTypes = {
  userDiscussion: PropTypes.objectOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
};

function UserDiscussionsList({ userDiscussions, onDelete }) {
  return (
    <ul className="users">
      {userDiscussions && userDiscussions.map((userDiscussion) => (
        <UserDiscussionItem
          userDiscussion={userDiscussion}
          key={userDiscussion.id}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

UserDiscussionsList.propTypes = {
  userDiscussions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

function UserDiscussionsListStore() {
  const userDiscussions = useSelector(UserDiscussionsSelector);
  const [cookies, setCookie] = useCookies(['user']);
  const dispatch = useDispatch();

  const onDelete = useCallback((userDiscussion) => {
    dispatch(deleteUserDiscussion(userDiscussion));
  }, [dispatch]);
  return (
    <UserDiscussionsList
      userDiscussions={userDiscussions}
      onDelete={onDelete}
    />
  );
}

export default UserDiscussionsListStore;
