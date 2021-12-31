const initialState = {

};

export const UPDATE_MESSAGE_USER_SELECTED = 'UPDATE_MESSAGE_USER_SELECTED';

export default function ChannelMessageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE_USER_SELECTED:
      return action.payload;
    default:
      return (state);
  }
}
