import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import './form.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../utils/userSlices'; // Import fetchUsers

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password.padEnd(6,0));
      console.log("Logged in successfully!");
      const currentUser = users.find(user => user.email === email); // Find the logged-in user
      if (currentUser && (currentUser.isBlocked || currentUser.isDeleted)) {
        // Show modal if the user is blocked or deleted
        setErrorMessage("Your account is blocked or deleted. Please contact support for assistance.");
        setShowModal(true);
      } else {
        navigate('/table');
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        // Handle invalid login credentials
        setErrorMessage('Invalid username or password. Please try again.');
        setShowModal(true);
      } else {
        // Handle other login errors
        console.error(error);
      }
    }
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="form-container">
        <h2>LOGIN</h2>
        <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} className='input-form'/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='input-form'/>
        <button onClick={handleLogin} className='but-home'>Login</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h1>{errorMessage}</h1>
            <button onClick={handleCloseModal} className='but-home'>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
