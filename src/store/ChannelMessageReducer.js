let id = 0;
const initialState = [

];

export const ADD_CHANNEL_MESSAGE = 'ADD_CHANNEL_MESSAGE';
export const UPDATE_CHANNEL_MESSAGE = 'UPDATE_CHANNEL_MESSAGE';

export default function ChannelMessageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHANNEL_MESSAGE:
      if (action.payload.id == null) {
        id += 1;
        return ([...state, { id, ...action.payload }]);
      }
      return ([...state, { ...action.payload }]);
    case UPDATE_CHANNEL_MESSAGE:
      return action.payload;
    default:
      return (state);
  }
}
