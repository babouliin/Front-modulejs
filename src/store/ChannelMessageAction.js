import wait from '../wait';
import { ADD_CHANNEL_MESSAGE } from './ChannelMessageReducer';

const addChannelMessage = (name, message) => async (dispatch) => {
  await wait(2000);
  dispatch({
    type: ADD_CHANNEL_MESSAGE,
    payload: { name, message },
  });
};

export default addChannelMessage;
