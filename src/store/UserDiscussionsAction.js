import wait from '../wait';
import { ADD_USER_DISCUSSION, DELETE_USER_DISCUSSION, UPDATE_USER_DISCUSSION } from './UserDiscussionsReducer';

export const updateUserDiscussion = (userDiscussions) => ({
  type: UPDATE_USER_DISCUSSION,
  payload: userDiscussions,
});

export const addUserDiscussion = (name) => async (dispatch) => {
  await wait(2000);
  dispatch({
    type: ADD_USER_DISCUSSION,
    payload: { name },
  });
};

const deleteUserDiscussion = (userDiscussion) => ({
  type: DELETE_USER_DISCUSSION,
  payload: userDiscussion.id,
});

export default deleteUserDiscussion;
