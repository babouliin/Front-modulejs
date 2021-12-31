import { UPDATE_MESSAGE_USER_SELECTED } from './MessageUserSelectedReducer';

export const updateMessageUserSelected = (chatId, userId, pseudo) => ({
  type: UPDATE_MESSAGE_USER_SELECTED,
  payload: { chatId, userId, pseudo },
});

export default updateMessageUserSelected;
