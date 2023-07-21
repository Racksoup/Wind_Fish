import React, { useState, useEffect, useRef } from 'react';
import './CreateBlog.scss';
import { createBlog } from '../../../../../Redux/Blog/blogSlice.js';
import { getCategories, selectCategories } from '../../../../../Redux/Blog/categorySlice.js';
import { getTags, addTag, selectTags } from '../../../../../Redux/Blog/tagSlice.js';
import {
  loadUser,
  selectIsAuthenticated,
  selectLoading,
} from '../../../../../Redux/Blog/adminSlice.js';
import ImageModal from '../Modal/ImageModal.jsx';
import Modal from '../../Dev/BlogDetails/Modal/Modal.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getCategories());
    dispatch(getTags());
  }, []);

  const [item, setItem] = useState({
    title: '',
    poster: '',
    category: 'Bronze Age',
    date: '',
    text: [],
    tags: [],
    favorite: false,
    link: '',
    caption: '',
  });
  const [tagsDisplay, setTagsDisplay] = useState(false);
  const [imageModal, toggleImageModal] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [file, setFile] = useState('');
  const [inputText, setInputText] = useState('');
  const [contentFiles, setContentFiles] = useState([]);
  const [submitWasClicked, setSubmitWasClicked] = useState(false);
  const isSecondRender = useRef(true);
  const isFirstRender = useRef(true);

  // splits text and images from input. constructs object with type and content
  const splitText = (str) => {
    let textArr = str.split('---');
    let textArrObj = [];
    textArr.map((text) => {
      const ogText = text.split(' ').filter((v) => v !== '');
      let splitText = text.split(' ');
      splitText = splitText.filter((v) => v !== '');
      if (ogText[0] === '(image)') {
        let newImgObj = { type: 'image', content: '' };
        splitText.shift();
        splitText = splitText.join(' ');
        newImgObj.content = splitText.trim();
        textArrObj.push(newImgObj);
      }
      if (ogText[0] !== '(image)') {
        let newTextObj = { type: 'text', content: [] };
        newTextObj.content = text.trim();
        textArrObj.push(newTextObj);
      }
    });
    return textArrObj;
  };

  const submitClicked = () => {
    let text2 = splitText(inputText);
    setSubmitWasClicked(!submitWasClicked);
    setItem({ ...item, text: [...text2] });
  };

  // after submit clicked need to wait for text array to set in item.
  // run use effect on submitWasClicked handler
  // stop first 2 renders from triggering useEffect
  useEffect(() => {
    if (isFirstRender.current || isSecondRender.current) {
      if (!isFirstRender.current && isSecondRender.current) {
        isSecondRender.current = false;
      }
      isFirstRender.current = false;
    } else {
      dispatch(createBlog(item, file, contentFiles));
    }
  }, [submitWasClicked]);

  const inputTextChanged = (e) => {
    setInputText(e.target.value);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const inputChanged = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const inputCheckChanged = (e) => {
    setItem({ ...item, [e.target.name]: !item.favorite });
  };

  const deleteImageClicked = (item) => {
    let tt = contentFiles.filter((x) => {
      if (x.name !== item.name) return x;
    });
    setContentFiles(tt);
  };

  const inputTagChanged = (tagName) => {
    let inTags = false;
    item.tags.map((tag) => {
      if (tag === tagName) {
        inTags = true;
        setItem({ ...item, tags: item.tags.filter((tag) => tag !== tagName) });
      }
    });
    if (!inTags && item.tags.length < 3) {
      setItem({ ...item, tags: [...item.tags, tagName] });
    }
  };

  const tagsDropClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTagsDisplay(!tagsDisplay);
  };

  if (!isAuthenticated && !loading) return <Navigate to='/admin' />;

  return (
    <div className='CreateBlog'>
      {imageModal && (
        <ImageModal
          toggleModal={toggleImageModal}
          setContentFiles={setContentFiles}
          contentFiles={contentFiles}
        />
      )}
      {modal && (
        <Modal
          toggleModal={toggleModal}
          Func={addTag}
          title={'Add Tag'}
          placeHolder={'Tag'}
          type='tags'
        />
      )}
      <div className='BlogInfo' onClick={() => setTagsDisplay(false)}>
        <Link className='Link' to='/admin/blogs'>
          <div className='Btn'>Back</div>
        </Link>
        <h2 className='Title'>Create New Blog</h2>

        <div className='InputGroup'>
          <div className='Label'>Title: </div>
          <input
            className='Input'
            value={item.title}
            onChange={(e) => inputChanged(e)}
            name='title'
            placeholder='title'
          />
        </div>

        <div className='InputGroup'>
          <div className='Label'>Date: </div>
          <input
            className='Input'
            value={item.date}
            type='date'
            onChange={(e) => inputChanged(e)}
            name='date'
            placeholder='date'
          />
        </div>

        <div className='InputGroup'>
          <div className='Label'>Poster: </div>
          <input
            className='Input'
            value={item.poster}
            onChange={(e) => inputChanged(e)}
            name='poster'
            placeholder='poster'
          />
        </div>

        <div className='InputGroup'>
          <div className='Label'>Category: </div>
          <select
            className='Input'
            value={item.category}
            onChange={(e) => inputChanged(e)}
            name='category'
            placeholder='category'
          >
            {categories.map((cat, i) => {
              return (
                <option key={i} value={cat.category}>
                  {cat.category}
                </option>
              );
            })}
          </select>
        </div>

        <div className='InputGroup'>
          {!modal && !imageModal && (
            <div className='Btn' onClick={() => toggleModal(true)}>
              Add New Tag
            </div>
          )}
          <div className='Label'>Tags: </div>
          <div className='TagsDrop' onClick={(e) => tagsDropClicked(e)}>
            {item.tags.map((tag) => (
              <div className='TagsDropTag'>{tag},</div>
            ))}
          </div>
          {tagsDisplay && !modal && !imageModal && (
            <div className='TagsDropDisplay' onClick={(e) => e.stopPropagation(e)}>
              {tags.map((tagI, i) => {
                let tagActive = false;
                item.tags.map((itemTag) => {
                  if (itemTag === tagI.tag) {
                    tagActive = true;
                  }
                });
                if (tagActive) {
                  return (
                    <div
                      className='Tag TagActive'
                      key={i}
                      onClick={() => inputTagChanged(tagI.tag)}
                    >
                      {tagI.tag}
                    </div>
                  );
                } else
                  return (
                    <div className='Tag' key={i} onClick={() => inputTagChanged(tagI.tag)}>
                      {tagI.tag}
                    </div>
                  );
              })}
            </div>
          )}
        </div>

        <div className='InputGroup'>
          <div className='Label'>Favorite: </div>
          <input
            className='Input'
            checked={item.favorite}
            type='checkbox'
            onChange={(e) => inputCheckChanged(e)}
            name='favorite'
          />
        </div>

        <div className='InputGroup'>
          <div className='Label'>Header Image: </div>
          <input type='file' onChange={(e) => onFileChange(e)} name='file' />
        </div>

        <div className='InputGroup'>
          <div className='Label'>Image Caption: </div>
          <input
            className='Input'
            value={item.caption}
            onChange={(e) => inputChanged(e)}
            name='caption'
            placeholder='Caption'
          />
        </div>

        <div className='InputGroup'>
          <div className='Label'>Image Link: </div>
          <input
            className='Input'
            value={item.link}
            onChange={(e) => inputChanged(e)}
            name='link'
            placeholder='Link'
          />
        </div>

        <div className='Label'>Content: </div>
        <textarea
          className='Input ContentInput'
          value={inputText}
          onChange={(e) => inputTextChanged(e)}
          name='text'
          placeholder='text'
        />

        <div className='Btn' onClick={() => submitClicked()}>
          Create
        </div>
      </div>
      <div className='ImgInfo'>
        <div className='Title'>Content Images</div>
        <div className='Btn' onClick={() => toggleImageModal(true)}>
          Add Image
        </div>
        {contentFiles.map((baseFile, i) => {
          let newSrc = URL.createObjectURL(baseFile.file);
          return (
            <div className='ImgComp' key={i}>
              <div className='ImgTitleBox'>
                <div className='ImgName'>{baseFile.name}</div>
                <div className='Btn-2' onClick={() => deleteImageClicked(baseFile)}>
                  Del
                </div>
              </div>
              <img src={newSrc} alt='Img' className='ImgHolder' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateBlog;
