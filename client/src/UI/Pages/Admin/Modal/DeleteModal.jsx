import React from 'react';
import './Modal.scss';

import { useDispatch } from 'react-redux';

const DeleteModal = ({ toggleModal, Func, State, title }) => {
  const dispatch = useDispatch();
  const submitClicked = (e) => {
    e.stopPropagation();
    dispatch(Func(State));
    toggleModal(false);
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>{title}</h2>

        <div className='Btn Btn-Del' onClick={(e) => submitClicked(e)}>
          Confirm
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
