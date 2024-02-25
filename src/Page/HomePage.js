import React, {useState} from "react";
import Login from '../components/Login';
import Registration from '../components/Registartion';
import { Link } from "react-router-dom";

const HomePage =()=>{
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleRegistrationClick = () => {
        setShowRegistration(true);
        setShowLogin(false);
      };
    
      const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegistration(false);
      };
    return(
<div className="content-container">
  <h1>HELLO</h1>
  <div >
<button onClick={handleRegistrationClick} className="but-home" >
          Registration
        </button>
        <button onClick={handleLoginClick} className="but-home">
          Login
        </button>
        {showRegistration ? (
    <Registration onCancel={() => setShowRegistration(false)} />
  ) : null}
  {showLogin ? <Login setLoggedInUser={setLoggedInUser} /> : null}
  </div>
</div>
    )
}

export default HomePage