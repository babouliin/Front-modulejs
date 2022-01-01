import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserDiscussion } from '../store/UserDiscussionsAction';
import { updateChannelMessage } from '../store/ChannelMessageAction';
import { updateMessageUserSelected } from '../store/MessageUserSelectedAction';
import UserListSelector from '../store/UserListSelector';

function AddUserDiscussion() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userList = useSelector(UserListSelector);
  const [state, setState] = useState({
    optionSelected: '0',
    optionNameSelected: '...',
  });

  const handleSubmit = (async (e) => {
    e.preventDefault();
    console.log(state.optionSelected);
    setLoading(true);
    if (state.optionSelected !== '0') {
      await dispatch(addUserDiscussion(null, state.optionNameSelected, state.optionSelected));
      await dispatch(
        updateMessageUserSelected(
          null, state.optionSelected, state.optionNameSelected,
        ),
      );
      await dispatch(updateChannelMessage([]));
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
