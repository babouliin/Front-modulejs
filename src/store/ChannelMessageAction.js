import wait from '../wait';
import { ADD_CHANNEL_MESSAGE, UPDATE_CHANNEL_MESSAGE } from './ChannelMessageReducer';

export const updateChannelMessage = (messages) => ({
  type: UPDATE_CHANNEL_MESSAGE,
  payload: messages,
});

const addChannelMessage = (id, pseudo, content) => async (dispatch) => {
  await wait(2000);
  dispatch({
    type: ADD_CHANNEL_MESSAGE,
    payload: { id, pseudo, content },
  });
};

export default addChannelMessage;
