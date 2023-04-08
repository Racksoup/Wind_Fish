import React, { useState } from 'react';
import './Modal.scss';

const CreateImageModal = ({ toggleModal, Func, blogID }) => {
  const [data, setData] = useState({ name: '', caption: '', link: '' });
  const [file, setFile] = useState('');

  const submitClicked = (e) => {
    e.stopPropagation();
    Func(file, data.name, blogID, data.link, data.caption);
    toggleModal(false);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const inputChanged = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <input
          className='Input'
          type='text'
          onChange={(e) => inputChanged(e)}
          name='name'
          placeholder='Name'
        />
        <input
          className='Input'
          type='text'
          onChange={(e) => inputChanged(e)}
          name='caption'
          placeholder='Caption'
        />
        <input
          className='Input'
          type='text'
          onChange={(e) => inputChanged(e)}
          name='link'
          placeholder='Link'
        />
        <input type='file' onChange={(e) => onFileChange(e)} name='file' />

        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default CreateImageModal;
