import { applyMiddleware, combineReducers, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import UserDiscussionsReducer from './UserDiscussionsReducer';
import UserListReducer from './UserListReducer';
import UserReducer from './UserReducer';
import ChannelMessageReducer from './ChannelMessageReducer';

const store = createStore(
  combineReducers({
    userDiscussions: UserDiscussionsReducer,
    userList: UserListReducer,
    user: UserReducer,
    channelMessage: ChannelMessageReducer,
    // eslint-disable-next-line no-unused-vars
    filter: (state = 0, action) => state,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
