import {
  React, useCallback,
} from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import APIMessage from '../API/APIMessage';
import UserDiscussionsSelector from '../store/UserDiscussionsSelector';
import deleteUserDiscussion from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';
import { updateMessageUserSelected } from '../store/MessageUserSelectedAction';

function UserDiscussionItem({ id, otherUserId, otherUserPseudo }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const OnSelect = async (chatId) => {
    await dispatch(
      updateMessageUserSelected(
        chatId, otherUserId, otherUserPseudo,
      ),
    );
    if (chatId != null) {
      const messagesReturn = await APIMessage.messages(chatId);
      if (messagesReturn) {
        const { data } = messagesReturn;
        if (messagesReturn.status === 200) {
          await dispatch(updateChannelMessage(data.data));
        } else {
          await dispatch(updateChannelMessage([]));
        }
      } else {
        message.error(t('serverUnreachable'));
      }
    } else {
      await dispatch(updateChannelMessage([]));
    }
  };

  return (
    <div onClick={() => OnSelect(id)} aria-hidden="true">
      <li className="person" data-chat={otherUserId}>
        <div className="user">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="Retail Admin" />
        </div>
        <p className="name-time">
          <span className="name">{otherUserPseudo}</span>
        </p>
      </li>
    </div>
  );
}

UserDiscussionItem.propTypes = {
  id: PropTypes.string.isRequired,
  otherUserId: PropTypes.string.isRequired,
  otherUserPseudo: PropTypes.string.isRequired,
};

function UserDiscussionsList({ userDiscussions, onDelete }) {
  return (
    <ul className="users">
      {userDiscussions && userDiscussions.length > 0 && userDiscussions.map((userDiscussion) => (
        <UserDiscussionItem
          id={userDiscussion.id}
          otherUserId={userDiscussion.other_user.id}
          otherUserPseudo={userDiscussion.other_user.pseudo}
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
