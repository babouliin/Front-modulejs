let id = 0;
const initialState = [

];

export const ADD_CHANNEL_MESSAGE = 'ADD_CHANNEL_MESSAGE';
export const UPDATE_CHANNEL_MESSAGE = 'UPDATE_CHANNEL_MESSAGE';

export default function ChannelMessageReducer(state = initialState, action) {
  let messages;
  switch (action.type) {
    case ADD_CHANNEL_MESSAGE:
      if (action.payload.id == null) {
        id += 1;
        return ([...state, { id, ...action.payload }]);
      }
      return ([...state, { ...action.payload }]);
    case UPDATE_CHANNEL_MESSAGE:
      messages = action.payload.messages;
      if (messages.length > 0) {
        messages = messages.map((mess) => {
          if (mess.from_user.id === action.payload.userId) {
            return ({ ...mess, pseudo: mess.from_user.pseudo, isRespond: true });
          }
          return ({ ...mess, pseudo: mess.from_user.pseudo, isRespond: false });
        });
      }
      return messages;
    default:
      return (state);
  }
}
