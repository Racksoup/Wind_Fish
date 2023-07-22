import React, { useState } from 'react';
import './Modal.scss';

import { useDispatch } from 'react-redux';

const ImageModal = ({ toggleModal, setContentFiles, contentFiles }) => {
  const dispatch = useDispatch();
  const [baseFile, setBaseFile] = useState({ file: '', name: '', link: '', caption: '' });

  const submitClicked = (e) => {
    e.stopPropagation();
    dispatch(setContentFiles([...contentFiles, baseFile]));
    toggleModal(false);
  };

  const inputChanged = (e) => {
    setBaseFile({ baseFile, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setBaseFile({ file: e.target.files[0], name: baseFile.name });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>Add Image</h2>

        <input className='Input' onChange={(e) => inputChanged(e)} name='name' placeholder='Name' />
        <input
          className='Input'
          onChange={(e) => inputChanged(e)}
          name='caption'
          placeholder='Caption'
        />
        <input className='Input' onChange={(e) => inputChanged(e)} name='link' placeholder='Link' />
        <input type='file' onChange={(e) => onFileChange(e)} name='contentFile' />

        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
