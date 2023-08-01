import React from 'react';
import './Modal.scss';

import { useDispatch } from 'react-redux';

const DeleteAccountModal = ({ toggleModal, Func }) => {
  const dispatch = useDispatch();

  const submitClicked = (e) => {
    e.stopPropagation();
    dispatch(Func());
    toggleModal(false);
  };

  return (
    <div className='Modal-Background'>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <div className='Close' onClick={() => toggleModal(false)}></div>
        <h2 className='Title'>Delete Account?</h2>
        <div className='Btn Btn-Del' onClick={(e) => submitClicked(e)}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
