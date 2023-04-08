import React from 'react';
import './Modal.scss';

const DeleteModal = ({ toggleModal, text }) => {
  return (
    <div className='Contact-Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Contact-Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>{text}</h2>
      </div>
    </div>
  );
};

export default DeleteModal;
