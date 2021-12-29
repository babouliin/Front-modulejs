import {
  React, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import UserDiscussionsSelector from '../store/UserDiscussionsSelector';
import deleteUserDiscussion from '../store/UserDiscussionsAction';

function UserDiscussionItem({ userDiscussion, onDelete }) {
  return (
    <li className="person" data-chat={userDiscussion.id}>
      <div className="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="Retail Admin" />
        <span className={userDiscussion.status} />
      </div>
      <p className="name-time">
        <span className="name">{userDiscussion.name}</span>
        <span className="time">{userDiscussion.time}</span>
      </p>
      <button className="btn float-end" type="button" onClick={() => onDelete(userDiscussion)}>
        <span className="iconRed">
          <i className="fa fa-minus-circle" />
        </span>
      </button>
    </li>
  );
}

UserDiscussionItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userDiscussion: PropTypes.object.isRequired,
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
  // eslint-disable-next-line react/forbid-prop-types
  userDiscussions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function UserDiscussionsListStore() {
  const userDiscussions = useSelector(UserDiscussionsSelector);
  const dispatch = useDispatch();
  const onDelete = useCallback((userDiscussion) => {
    dispatch(deleteUserDiscussion(userDiscussion));
  }, [dispatch]);
  return (
    <UserDiscussionsList userDiscussions={userDiscussions} onDelete={onDelete} />
  );
}

export default UserDiscussionsListStore;
