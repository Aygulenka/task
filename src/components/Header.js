import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import './Header.css'
import './Modal.css'

const Header = () =>{


 const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      return () => {
        setIsMounted(false);
      };
    }, []);
  
    const handleLogout = () => {
      setShowLogoutModal(true);
    };
    const confirmLogout = async () => {
        navigate('/');
        setShowLogoutModal(false);
    };
  
    const cancelLogout = () => {
      setShowLogoutModal(false);
    };
  
    return (
      <header className="header">
        <div className="header-left">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="header-icon home-icon" />
          </Link>
        </div>
        <div className="header-right">
          <Link to="#" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="header-icon logout-icon" />
          </Link>
        </div>
  
        {showLogoutModal && (
          <div className="modal">
            <h1>Вы уверены, что хотите выйти из аккаунта? </h1>
            <div className='flex'>
            <button onClick={confirmLogout} disabled={loading} className='but-home'>Да</button>
            <button onClick={cancelLogout} disabled={loading} className='but-home'>Отмена</button>
          </div>
          </div>
        )}
      </header>
    );

}

export default Header;