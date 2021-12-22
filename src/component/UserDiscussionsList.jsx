import {
  React, useCallback,
} from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './Layout';
import UserDiscussionsSelector from '../store/UserDiscussionsSelector';
import deleteUserDiscussion from '../store/UserDiscussionsAction';
import AddUserDiscussion from './AddUserDiscussion';
import ExampleComponent from './ExampleComponent';

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
      <button type="button" onClick={() => onDelete(userDiscussion)}>x</button>
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
      {/* eslint-disable-next-line react/prop-types */}
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
    <Layout className="app-camearadetails" isHeader>
      <h1>Welcome to Home Two</h1>
      <Link to="/home">Home</Link>
      <Link to="/page-1" className="ml-3">Page_One</Link>
      <ExampleComponent />
      <UserDiscussionsList userDiscussions={userDiscussions} onDelete={onDelete} />
      <AddUserDiscussion />
    </Layout>
  );
}

export default UserDiscussionsListStore;
