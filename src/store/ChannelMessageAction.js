import { ADD_CHANNEL_MESSAGE, UPDATE_CHANNEL_MESSAGE } from './ChannelMessageReducer';
import APIUser from '../API/APIUser';

export const updateChannelMessage = (messages) => async (dispatch) => {
  const userReturn = await APIUser.getUser();
  let userId = null;
  if (userReturn) {
    const { data } = userReturn;
    if (userReturn.status === 200) {
      userId = data.data.id;
    } else {
      return;
    }
  } else {
    return;
  }
  if (userId != null) {
    dispatch({
      type: UPDATE_CHANNEL_MESSAGE,
      payload: { messages, userId },
    });
  }
};

const addChannelMessage = (id, pseudo, content, fromUser, toUser) => async (dispatch) => {
  const userReturn = await APIUser.getUser();
  let pseudoMessage = pseudo;
  let userId = null;
  if (userReturn) {
    const { data } = userReturn;
    if (userReturn.status === 200) {
      userId = data.data.id;
    } else {
      return;
    }
  } else {
    return;
  }
  if (userId != null) {
    let isRespond;
    if (fromUser.id === userId) {
      isRespond = true;
      pseudoMessage = fromUser.pseudo;
    } else {
      isRespond = false;
      pseudoMessage = fromUser.pseudo;
    }
    dispatch({
      type: ADD_CHANNEL_MESSAGE,
      payload: {
        id, pseudo: pseudoMessage, from_user: fromUser, to_user: toUser, content, isRespond,
      },
    });
  }
};

export default addChannelMessage;
