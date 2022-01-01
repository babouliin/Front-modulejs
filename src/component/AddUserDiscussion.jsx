import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserDiscussion } from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';
import { updateMessageUserSelected } from '../store/MessageUserSelectedAction';
import APIMessage from '../API/APIMessage';
import UserListSelector from '../store/UserListSelector';
import UserDiscussionsSelector from '../store/UserDiscussionsSelector';

function AddUserDiscussion() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userList = useSelector(UserListSelector);
  const userDiscussions = useSelector(UserDiscussionsSelector);
  const [state, setState] = useState({
    optionSelected: '0',
    optionNameSelected: '...',
  });

  const handleSubmit = (async (e) => {
    let hasExistingUserDiscussion = false;
    e.preventDefault();
    setLoading(true);
    if (state.optionSelected !== '0') {
      userDiscussions.forEach(async (userDiscussion) => {
        if (userDiscussion.other_user.id
          === state.optionSelected) {
          hasExistingUserDiscussion = true;
          console.log(hasExistingUserDiscussion);
          await dispatch(
            updateMessageUserSelected(
              userDiscussion.id, state.optionSelected, state.optionNameSelected,
            ),
          );
          if (userDiscussion.id != null) {
            const messagesReturn = await APIMessage.messages(userDiscussion.id);
            if (messagesReturn) {
              const { data } = messagesReturn;
              if (messagesReturn.status === 200) {
                console.log(data.data);
                await dispatch(updateChannelMessage(data.data));
              } else {
                await dispatch(updateChannelMessage([]));
              }
            }
          } else {
            await dispatch(updateChannelMessage([]));
          }
        }
      });
      if (!hasExistingUserDiscussion) {
        await dispatch(addUserDiscussion(null, state.optionNameSelected, state.optionSelected));
        await dispatch(
          updateMessageUserSelected(
            null, state.optionSelected, state.optionNameSelected,
          ),
        );
        await dispatch(updateChannelMessage([]));
      }
    }
    setLoading(false);
    setState((prevState) => ({
      ...prevState,
      optionSelected: '0',
      optionNameSelected: '...',
    }));
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(document.getElementById(e.target.value).innerHTML);
    setState((prevState) => ({
      ...prevState,
      optionSelected: e.target.value,
      optionNameSelected: document.getElementById(e.target.value).innerHTML,
    }));
  };

  return (
    <div className="chat-search-box">
      <div className="input-group">
        <select className="form-select" aria-label="Default select example" value={state.optionSelected} onChange={handleChange}>
          <option name="default" id="0" key="0" value="0">...</option>
          {userList.map((user) => (
            <option key={user.id} id={user.id} name={user.pseudo} value={user.id}>
              {user.pseudo}
            </option>
          ))}
        </select>
        <div className="input-group-btn">
          <button type="button" disabled={loading} onClick={handleSubmit} className="btn btn-info">
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserDiscussion;
