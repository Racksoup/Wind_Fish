import React from 'react';
import './Modal.scss';

const DeleteModal = ({ toggleModal, Func, State, title }) => {
  const submitClicked = (e) => {
    e.stopPropagation();
    Func(State);
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
