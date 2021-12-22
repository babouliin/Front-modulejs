const initialState = {};

export const UPDATE_USER = 'UPDATE_USER';

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return (action.payload);
    default:
      return (state);
  }
}
