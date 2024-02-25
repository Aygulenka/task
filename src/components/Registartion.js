import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './form.css'

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();

  const usersCollection = collection(db, 'users');


  const handleRegister = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password.padEnd(6,0));
      console.log("user.metadata", user.metadata)
      await updateProfile(user, { displayName });
      const userId = user.uid;
      console.log(userId)
      const creationTime = new Date(user.metadata.creationTime).toLocaleString();
      const lastLoginAt = new Date(user.metadata.lastSignInTime).toLocaleString();
      const isBlocked = false;

      await addDoc(usersCollection, { email, password, userId, displayName, creationTime, lastLoginAt, isBlocked });
      console.log("User registered:", user);
      navigate('/table');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>REGISTRATION</h2>
      <input type="text" placeholder="Username" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className='input-form'/>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className='input-form'/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='input-form'/>
      <button onClick={handleRegister} className='but-home'>Register</button>
    </div>
  );
};

export default Registration;
