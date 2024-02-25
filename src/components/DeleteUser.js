import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './button.css';

const DeleteUser = ({ id, onUpdate, selectedUsers }) => {
    const db = getFirestore();

    const handleDelete = async () => {
        try {
            for (const userId of selectedUsers) {
                await deleteDoc(doc(db, 'users', userId));
            }
            onUpdate(); 
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    }

    return (
        <button className="glow-on-hover" type="button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faUserXmark} className='icon'/>
            DELETE
        </button>
    )
}

export default DeleteUser;

