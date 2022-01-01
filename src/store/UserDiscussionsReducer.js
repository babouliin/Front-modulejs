const initialState = [

];

export const ADD_USER_DISCUSSION = 'ADD_USER_DISCUSSION';
export const DELETE_USER_DISCUSSION = 'DELETE_USER_DISCUSSION';
export const UPDATE_USER_DISCUSSION = 'UPDATE_USER_DISCUSSION';

export default function UserDiscussionsReducer(state = initialState, action) {
  let stateTemp = state;
  switch (action.type) {
    case ADD_USER_DISCUSSION:
      if (stateTemp && stateTemp.length > 0
      && stateTemp.filter((userDiscussion) => userDiscussion.other_user.id
      !== action.payload.other_user.id).length <= 0) {
        return ([{ ...action.payload }]);
      }
      stateTemp = stateTemp.filter((userDiscussion) => userDiscussion.other_user.id
      !== action.payload.other_user.id);
      if (stateTemp.length <= 0) {
        return ([{ ...action.payload }]);
      }
      return ([...stateTemp, { ...action.payload }]);
    case DELETE_USER_DISCUSSION:
      return (state.filter((userDiscussion) => userDiscussion.id !== action.payload));
    case UPDATE_USER_DISCUSSION:
      return (action.payload);
    default:
      return (state);
  }
}
