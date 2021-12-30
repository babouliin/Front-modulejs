/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserDiscussion } from '../store/UserDiscussionsAction';
import UserListSelector from '../store/UserListSelector';

function AddUserDiscussion() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userList = useSelector(UserListSelector);
  const [optionSelected, setState] = useState('0');

  const handleSubmit = (async (e) => {
    e.preventDefault();
    console.log(optionSelected.optionSelected);
    setLoading(true);
    // await dispatch(addUserDiscussion(input.current.value));
    setLoading(false);
    setState((prevState) => ({
      ...prevState,
      optionSelected: '0',
    }));
  });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      optionSelected: e.target.value,
    }));
  };

  return (
    <div className="chat-search-box">
      <div className="input-group">
        <select className="form-select" aria-label="Default select example" value={optionSelected.optionSelected} onChange={handleChange}>
          <option key="0" value="0">...</option>
          {userList.map((user) => (
            <option key={user.id} name={user.pseudo} value={user.id}>{user.pseudo}</option>
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
