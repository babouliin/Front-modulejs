import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import UserDiscussionsReducer from './UserDiscussionsReducer';
import UserListReducer from './UserListReducer';
import UserReducer from './UserReducer';
import ChannelMessageReducer from './ChannelMessageReducer';
import MessageUserSelectedReducer from './MessageUserSelectedReducer';

const store = createStore(
  combineReducers({
    userDiscussions: UserDiscussionsReducer,
    userList: UserListReducer,
    user: UserReducer,
    channelMessage: ChannelMessageReducer,
    messageUserSelected: MessageUserSelectedReducer,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
