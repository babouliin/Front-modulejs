import { UPDATE_USER } from './UserReducer';

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export default updateUser;
