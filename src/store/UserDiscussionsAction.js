import wait from '../wait';
import { ADD_USER_DISCUSSION, DELETE_USER_DISCUSSION } from './UserDiscussionsReducer';

const deleteUserDiscussion = (userDiscussion) => ({
  type: DELETE_USER_DISCUSSION,
  payload: userDiscussion.id,
});

export const addUserDiscussion = (name) => async (dispatch) => {
  await wait(2000);
  dispatch({
    type: ADD_USER_DISCUSSION,
    payload: { name },
  });
};

export default deleteUserDiscussion;
