const initialState = [
];

export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';

export default function UserListReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_LIST:
      return (action.payload);
    default:
      return (state);
  }
}
