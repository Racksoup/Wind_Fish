import React, { useState, useEffect, useRef } from 'react';
import '../CreateBlog/CreateBlog.scss';
import {
  updateBlog,
  getCurrBlog,
  deleteContentImage,
  createContentImage,
  updateImageName,
  selectBlog,
  selectContentImages,
  selectContentImagesLoaded,
} from '../../../../../Redux/Blog/blogSlice.js';
import {
  loadUser,
  selectIsAuthenticated,
  selectLoading,
} from '../../../../../Redux/Blog/adminSlice.js';
import { getTags, addTag, selectTags } from '../../../../../Redux/Blog/tagSlice.js';
import { selectCategories, getCategories } from '../../../../../Redux/Blog/categorySlice.js';
import Modal from '../BlogDetails/Modal/Modal.jsx';
import CreateImageModal from '../AdminDashboard/Modal/CreateImageModal.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const blog = useSelector(selectBlog);
  const tags = useSelector(selectTags);
  const categories = useSelector(selectCategories);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const contentImages = useSelector(selectContentImages);
  const contentImagesLoaded = useSelector(selectContentImagesLoaded);
  const [modal, toggleModal] = useState(false);
  const [tagsDisplay, setTagsDisplay] = useState(false);
  const [imageModal, toggleImageModal] = useState(false);
  const [item, setItem] = useState(blog);
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState('');
  const [imgName, setImgName] = useState([]);
  // loads user and current blog
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getCurrBlog());
    dispatch(getTags());
    dispatch(getCategories());
  }, []);
  // sets item after current blog is returned
  useEffect(() => {
    if (blog !== null) {
      const newDate = new Date(blog.date).toISOString().split('T')[0];
      setItem({ ...item, date: newDate });
    }
    let x = [];
    if (blog) {
      blog.text.map((v) => {
        if (v.type === 'text') {
          x.push(v.content);
        }
        if (v.type === 'image') {
          x.push(`\n\n--- (image) ${v.content} ---\n\n`);
        }
      });
      x = x.join(' ');
      setInputText(x);
    }
  }, [blog]);

  const isFirstRender = useRef(true);
  const isSecondRender = useRef(true);
  const [submitWasClicked, setSubmitWasClicked] = useState(false);

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
      dispatch(updateBlog(item, file));
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

  const imgNameFocused = (e, img) => {
    setImgName({ ...imgName, [e.target.name]: img.metadata.imgName });
  };

  const imgNameChanged = (e) => {
    setImgName({ ...imgName, [e.target.name]: e.target.value });
  };

  const imgNameEnter = (e, file, name, blog) => {
    if (e.keyCode === 13) {
      dispatch(updateImageName(file, name, blog._id, file.metadata.link, file.metadata.caption));
    }
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

  if (!item && !contentImagesLoaded) {
    <h1>Loading</h1>;
  } else {
    return (
      <div className='CreateBlog'>
        {imageModal && (
          <CreateImageModal
            Func={createContentImage}
            toggleModal={toggleImageModal}
            blogID={item._id}
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
        <div className='BlogInfo'>
          <Link className='Link' to='/admin-dashboard'>
            <div className='Btn'>Back</div>
          </Link>
          <h2 className='Title'>Update Blog</h2>

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
              placeholder={item.category}
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
              {item.tags.map((tag, i) => (
                <div key={i} className='TagsDropTag'>
                  {tag},
                </div>
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
            <div className='Label'>Image: </div>
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
            Update
          </div>
        </div>

        <div className='ImgInfo'>
          <div className='Title'>Content Images</div>
          <div className='Btn' onClick={() => toggleImageModal(true)}>
            Add Image
          </div>
          {contentImagesLoaded &&
            contentImages.map((file, i) => {
              let v;
              Object.entries(imgName).map((x) => {
                if (x[0] === file.filename) {
                  v = x[1];
                }
              });
              return (
                <div className='ImgComp' key={i}>
                  <div className='ImgTitleBox'>
                    <input
                      className='ImgName'
                      name={file.filename}
                      value={v}
                      placeholder={file.metadata.imgName}
                      onFocus={(e) => imgNameFocused(e, file)}
                      onChange={(e) => imgNameChanged(e)}
                      onKeyDown={(e) => imgNameEnter(e, file, v, item)}
                    />
                    <div className='Btn-2' onClick={() => dispatch(deleteContentImage(file))}>
                      Del
                    </div>
                  </div>
                  <img
                    src={`/api/backend-blog/blogs/content-image/${file.filename}`}
                    alt='Img'
                    className='ImgHolder'
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default UpdateBlog;
