import React, { useState } from 'react';
import './Modal';

const Modal = ({ toggleModal, Func, title, placeHolder, type }) => {
  const [item, setItem] = useState('');
  const [file, setFile] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === 'tags') {
      Func(item);
    }
    if (type === 'categories') {
      Func(item, file);
    }
    toggleModal(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const inputChanged = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>{title}</h2>
        {type === 'tags' && (
          <input
            className='Input'
            value={item}
            onChange={(e) => inputChanged(e)}
            onKeyDown={(e) => onKeyDown(e)}
            name='category'
            placeholder={placeHolder}
          />
        )}
        {type === 'categories' && (
          <input
            className='Input'
            value={item}
            onChange={(e) => inputChanged(e)}
            name='category'
            placeholder={placeHolder}
          />
        )}
        {type === 'categories' && (
          <div className='FileInput'>
            <div className='Label'>Image: </div>
            <input type='file' onChange={(e) => onFileChange(e)} className='Input' />
          </div>
        )}
        <div className='Btn' onClick={(e) => onSubmit(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Modal;
