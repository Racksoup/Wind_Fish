import React, { useEffect, useState } from 'react';
import './BlogDetails.scss';
import { selectTags, getTags, addTag, deleteTag } from '../../../../../Redux/Blog/tagSlice';
import { selectIsAuthenticated, loadUser } from '../../../../../Redux/Blog/adminSlice';
import {
  selectCategories,
  getCategories,
  addCategory,
  deleteCategory,
} from '../../../../../Redux/Blog/categorySlice';
import Modal from './Modal/Modal.jsx';
import DeleteModal from '../../Admin/Modal/DeleteModal.jsx';

import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const categories = useSelector(selectCategories);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
    dispatch(loadUser());
  }, []);
  const [submitBlogModal, toggleSubmitBlogModal] = useState(false);
  const [newsletter, setNewsletter] = useState({
    link: '',
    text: '',
  });
  const [item, setItem] = useState('');
  const [categoryModal, toggleCategoryModal] = useState(false);
  const [tagModal, toggleTagModal] = useState(false);
  const [deleteCategoryModal, toggleDeleteCategoryModal] = useState(false);
  const [deleteTagModal, toggleDeleteTagModal] = useState(false);

  const deleteCategoryClicked = (cat) => {
    setItem(cat);
    toggleDeleteCategoryModal(true);
  };
  const deleteTagClicked = (tag) => {
    setItem(tag);
    toggleDeleteTagModal(true);
  };

  if (!isAuthenticated) return <Navigate to='/login-admin' />;

  return (
    <div className='BlogDetails'>
      {categoryModal && (
        <Modal
          toggleModal={toggleCategoryModal}
          Func={addCategory}
          title={'Add Category'}
          placeHolder={'Category'}
          type='categories'
        />
      )}
      {tagModal && (
        <Modal
          toggleModal={toggleTagModal}
          Func={addTag}
          title={'Add Tag'}
          placeHolder={'Tag'}
          type='tags'
        />
      )}
      {deleteCategoryModal && (
        <DeleteModal
          toggleModal={toggleDeleteCategoryModal}
          Func={deleteCategory}
          title='Delete Category?'
          State={item}
        />
      )}
      {deleteTagModal && (
        <DeleteModal
          toggleModal={toggleDeleteTagModal}
          Func={deleteTag}
          title='Delete Tag?'
          State={item}
        />
      )}
      {submitBlogModal && (
        <DeleteModal
          toggleModal={toggleSubmitBlogModal}
          Func={sendNewsletter}
          title='Send Newsletter?'
          State={newsletter}
        />
      )}
      <Link className='Link LinkBack' to='/admin'>
        <div className='Btn '>Back</div>
      </Link>
      <div className='NewsletterBox'>
        <div className='Label'>Enter New Blog Link:</div>
        <input
          type='text'
          className='Input'
          placeholder='text'
          onChange={(e) => setNewsletter({ ...newsletter, text: e.target.value })}
          value={newsletter.text}
        />
        <input
          type='text'
          className='Input'
          placeholder='link'
          onChange={(e) => setNewsletter({ ...newsletter, link: e.target.value })}
          value={newsletter.link}
        />
        <div className='Btn' onClick={() => toggleSubmitBlogModal(true)}>
          Submit
        </div>
      </div>
      <div className='Bottom'>
        <div className='Categories'>
          <div className='Title'>Categories</div>
          <div className='Btn' onClick={() => toggleCategoryModal(true)}>
            Add Category
          </div>
          <div className='CategoriesView'>
            {categories.map((cat, i) => {
              return (
                <div className='Category' key={i}>
                  <div className='Name'>{cat.category}</div>
                  <div className='Delete-Btn' onClick={() => deleteCategoryClicked(cat)}>
                    <FontAwesomeIcon className='Icon' icon={faX} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='Categories'>
          <div className='Title'>Tags</div>
          <div className='Btn' onClick={() => toggleTagModal(true)}>
            Add Tags
          </div>
          <div className='CategoriesView'>
            {tags.map((tag, i) => {
              return (
                <div className='Category' key={i}>
                  <div className='Name'>{tag.tag}</div>
                  <div className='Delete-Btn' onClick={() => deleteTagClicked(tag)}>
                    <FontAwesomeIcon className='Icon' icon={faX} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
