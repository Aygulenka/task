import React, { useEffect, useState } from 'react';
import DeleteUser from './DeleteUser';

const UserDetails = ({ user, index, onUpdateUser, onDeleteUser, selected, onSelect }) => {
    useEffect(() => {
        onUpdateUser();
    }, [user.isBlocked, onUpdateUser]); 

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    onChange={() => onSelect(user.id)} 
                    checked={selected}
                />
            </td>
            <td>{index + 1}</td>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.creationTime}</td>
            <td>{user.lastLoginAt}</td>
            <td>{user.isBlocked ? 'BLOCKED' : 'ACTIVE'}</td>
        </tr>
    );
};

export default UserDetails;
