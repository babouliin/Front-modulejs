let id = 2;
const initialState = [
  {
    id: 1,
    name: 'Thomas',
    message: 'Salut ca va ?',
    hour: '10:23',
  },
  {
    id: 2,
    name: 'Pierre',
    message: 'oui et toi ?',
    hour: '10:24',
  },
];

export const ADD_CHANNEL_MESSAGE = 'ADD_CHANNEL_MESSAGE';
export const UPDATE_CHANNEL_MESSAGE = 'UPDATE_CHANNEL_MESSAGE';

export default function ChannelMessageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHANNEL_MESSAGE:
      // eslint-disable-next-line no-plusplus
      return ([...state, { id: ++id, ...action.payload }]);
    case UPDATE_CHANNEL_MESSAGE:
      return action.payload;
    default:
      return (state);
  }
}
