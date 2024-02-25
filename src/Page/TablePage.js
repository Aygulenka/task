import React, { useEffect, useState } from 'react';
import UserDetails from '../components/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, checkBlockedOrDeletedUser } from '../utils/userSlices'; 
import UserBlockButton from '../components/UserBlockButton';
import DeleteUser from '../components/DeleteUser';
import './Home.css'
const TablePage = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    
    const handleCheckUser = async (userId) => {
        try {
            dispatch(checkBlockedOrDeletedUser(userId))
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, handleCheckUser]);

    const onSelectAll = () => {
        setSelectedUsers(users.map(user => user.id));
    };

    useEffect(() => {
        console.log(selectedUsers);
    }, [selectedUsers]); // Этот useEffect будет вызываться каждый раз, когда selectedUsers изменяется
    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };
    return (
        <>
            <div className="content-container">
                <h1>Welcome to the Table Page</h1>
                <div className='buttons'>
                    <button className="glow-on-hover" onClick={onSelectAll}>
                        SELECT ALL
                    </button>
                    <UserBlockButton selectedUsers={selectedUsers} onUpdate={() => setSelectedUsers([])} />
                    <DeleteUser selectedUsers={selectedUsers} onUpdate={() => setSelectedUsers([])} />
                </div>

                <table className='table'>
                    <thead>
                        <tr className='tr'>
                            <th>Select users</th>
                            <th>User ID</th>
                            <th>User name</th>
                            <th>User email</th>
                            <th>User account creation time</th>
                            <th>User last login</th>
                            <th>User status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <UserDetails
                                key={user.id}
                                index={index}
                                user={user}
                                onUpdateUser={handleCheckUser}
                                selected={selectedUsers.includes(user.id)} // Передайте состояние выбранного пользователя
                                onSelect={toggleUserSelection} // Передайте функцию toggleUserSelection
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TablePage;


