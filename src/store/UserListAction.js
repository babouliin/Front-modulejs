import { UPDATE_USER_LIST } from './UserListReducer';

const updateUserList = (userList) => ({
  type: UPDATE_USER_LIST,
  payload: userList,
});

export default updateUserList;
