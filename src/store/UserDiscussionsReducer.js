let id = 2;
const initialState = [
  {
    id: 1,
    pseudo: 'Thomas',
    status: 'status busy',
    time: '15/02/2019',
  },
  {
    id: 2,
    pseudo: 'Pierre',
    status: 'status busy',
    time: '15/02/2019',
  },
];

export const ADD_USER_DISCUSSION = 'ADD_USER_DISCUSSION';
export const DELETE_USER_DISCUSSION = 'DELETE_USER_DISCUSSION';
export const UPDATE_USER_DISCUSSION = 'UPDATE_USER_DISCUSSION';

export default function UserDiscussionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_DISCUSSION:
      // eslint-disable-next-line no-plusplus
      return ([...state, { id: ++id, ...action.payload }]);
    case DELETE_USER_DISCUSSION:
      return (state.filter((userDiscussion) => userDiscussion.id !== action.payload));
    case UPDATE_USER_DISCUSSION:
      return (action.payload);
    default:
      return (state);
  }
}
