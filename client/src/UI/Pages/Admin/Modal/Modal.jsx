import React, { useState } from 'react';
import './Modal.scss';

const Modal = ({ toggleModal, createItemFunc, initState, title }) => {
  const [item, setItem] = useState(initState);
  const [file, setFile] = useState('');

  const submitClicked = (e) => {
    e.stopPropagation();
    createItemFunc(item, file);
    toggleModal(false);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const inputChanged = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>{title}</h2>

        <input
          className='Input'
          value={item.title}
          onChange={(e) => inputChanged(e)}
          name='title'
          placeholder='title'
        />
        <input
          className='Input'
          value={item.poster}
          onChange={(e) => inputChanged(e)}
          name='poster'
          placeholder='poster'
        />
        <input
          className='Input'
          value={item.category}
          onChange={(e) => inputChanged(e)}
          name='category'
          placeholder='category'
        />
        <input
          className='Input'
          value={item.date}
          type='date'
          onChange={(e) => inputChanged(e)}
          name='date'
          placeholder='date'
        />
        <textarea
          className='Input'
          value={item.text}
          onChange={(e) => inputChanged(e)}
          name='text'
          placeholder='text'
        />
        <input
          className='Input'
          value={item.favorite}
          type='checkbox'
          onChange={(e) => inputChanged(e)}
          name='favorite'
          placeholder='favorite'
        />
        <input type='file' onChange={(e) => onFileChange(e)} name='file' />

        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Modal;
