import React from 'react';
import './FailModal.scss';

const FailModal = ({ toggleModal }) => {
  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>Please use a valid email</h2>
      </div>
    </div>
  );
};

export default FailModal;
