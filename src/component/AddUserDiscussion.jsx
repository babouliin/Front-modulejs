import { React, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addUserDiscussion } from '../store/UserDiscussionsAction';

function AddUserDiscussion() {
  const dispatch = useDispatch();
  const input = useRef(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(addUserDiscussion(input.current.value));
    setLoading(false);
    input.current.value = '';
    input.current.focus();
  });

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="UserName" ref={input} />
      <button disabled={loading} onClick={handleSubmit} type="button">{t('add')}</button>
      {loading && t('loadingWaiting')}
    </form>
  );
}

export default AddUserDiscussion;
