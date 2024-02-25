import React, { useState } from 'react';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './button.css'

const UserBlockButton = ({ docId, isBlocked, onUpdate, selectedUsers }) => { 
  const [loading, setLoading] = useState(false);

  const handleBlockUser = async () => {
    setLoading(true);
    try {
      for (const docId of selectedUsers) {
        const userRef = doc(db, 'users', docId); // Используйте userId вместо docId
        if (isBlocked) {
          await updateDoc(userRef, { isBlocked: false });
        } else {
          await setDoc(userRef, { isBlocked: true }, { merge: true });
        }
        console.log(`Пользователь ${docId} был  'заблокирован'.`);
      }
      onUpdate();
    } catch (error) {
      console.error(`Ошибка при обновлении состояния блокировки пользователя:`, error);
    }
    setLoading(false);
  };
  const handleUnBlockUser = async () => {
    setLoading(true);
    try {
      for (const docId of selectedUsers) {
        const userRef = doc(db, 'users', docId); // Используйте userId вместо docId
        if (isBlocked) {
          await updateDoc(userRef, { isBlocked: true });
        } else {
          await setDoc(userRef, { isBlocked: false }, { merge: true });
        }
        console.log(`Пользователь ${docId} был 'разблокирован'}.`);
      }
      onUpdate();
    } catch (error) {
      console.error(`Ошибка при обновлении состояния блокировки пользователя:`, error);
    }
    setLoading(false);
  };

  return (
    <>
    <button onClick={handleBlockUser} disabled={loading} className="glow-on-hover">
      <span> <FontAwesomeIcon icon={faLock} className='icon' /> BLOCK</span>
    </button>
        <button onClick={handleUnBlockUser} disabled={loading} className="glow-on-hover">
        <span><FontAwesomeIcon icon={faLockOpen} className='icon'/> UNBLOCK</span>
      </button>
      </>
  );
};

export default UserBlockButton;
