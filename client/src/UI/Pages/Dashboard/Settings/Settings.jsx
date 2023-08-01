import React, { useState, useEffect } from 'react';
import { deleteUser } from '../../../../Redux/userSlice';
import './Settings.scss';
import DeleteAccountModal from '../Modal/DeleteAccountModal.jsx';

const Settings = ({ user }) => {
  const [deleteAccountModal, toggleDeleteAccountModal] = useState(false);
  const [accountName, setAccountName] = useState('');
  useEffect(() => {
    if (user) {
      setAccountName(user.name);
    }
  }, [user]);

  return (
    <div className='Settings'>
      {deleteAccountModal && (
        <DeleteAccountModal toggleModal={toggleDeleteAccountModal} Func={dispatch(deleteUser())} />
      )}
      <div className='Item'>
        <div className='Label'>Delete Account?</div>
        <div className='Btn Delete' onClick={() => toggleDeleteAccountModal(true)}>
          Delete
        </div>
      </div>
      <div className='Item'>
        <div className='Label'>Change Account</div>
        <input
          className='Input'
          onChange={(e) => setAccountName(e.target.value)}
          value={accountName}
        />
        <div
          className='Btn'
          // onClick={() => changeAccountName(accountName)}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default Settings;
