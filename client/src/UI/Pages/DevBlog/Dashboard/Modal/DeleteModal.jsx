import React, { useState } from 'react';
import './Modal.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const DeleteModal = ({ state, toggleModal, account, Func }) => {
  const [comment, setComment] = useState(state.comment);

  const submitClicked = (e) => {
    e.stopPropagation();
    Func(state.blogId, comment, account.name);
    toggleModal(false);
  };

  return (
    <div className='Modal-Background'>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <div className='Close' onClick={() => toggleModal(false)}>
          <FontAwesomeIcon icon={faX} className='Icon' />
        </div>
        <h2 className='Title'>Delete Comment</h2>
        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
