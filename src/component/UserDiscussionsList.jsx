import {
  React, useCallback,
} from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import APIMessage from '../API/APIMessage';
import UserDiscussionsSelector from '../store/UserDiscussionsSelector';
import deleteUserDiscussion from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';
import { updateMessageUserSelected } from '../store/MessageUserSelectedAction';

function UserDiscussionItem({ userDiscussion }) {
  const dispatch = useDispatch();
  const OnSelect = async (chatId) => {
    console.log('onSelect');
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
        </div>
        <p className="name-time">
          <span className="name">{userDiscussion.other_user.pseudo}</span>
        </p>
      </li>
    </div>
  );
}

UserDiscussionItem.propTypes = {
  userDiscussion: PropTypes.objectOf(PropTypes.string).isRequired,
};

function UserDiscussionsList({ userDiscussions, onDelete }) {
  return (
    <ul className="users">
      {userDiscussions && userDiscussions.length > 0 && userDiscussions.map((userDiscussion) => (
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
