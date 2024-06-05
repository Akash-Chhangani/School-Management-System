import './index.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithubAlt,
  faGoogle,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

function Overview() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleClickLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Simulate successful login by navigating to the dashboard
    navigate('/dashboards/Companies');
  };

  const handleClickSignUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Show popup and set timeout to navigate after 2 seconds
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      // Navigate to the dashboard after closing the popup
      navigate('/dashboards/Companies');
    }, 1500);
  };

  return (
    <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form loginForm" onSubmit={handleClickLogin}>
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn">
              Log In
            </button>
            <p className="social-text loginp">Sign in with social platforms</p>
            <div className="social-media">
              <a href="/" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className="my-auto mx-auto" />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="my-auto mx-auto"
                />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faGithubAlt}
                  className="my-auto mx-auto"
                />
              </a>
            </div>
          </form>

          <form
            onSubmit={handleClickSignUp}
            action="#"
            className="sign-up-form loginForm"
          >
            <h2 className="title">Create New Account</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn">
              Create Account
            </button>
            <p className="social-text loginp">
              Or Sign up with social platforms
            </p>
            <div className="social-media">
              <a href="/" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className="my-auto mx-auto" />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="my-auto mx-auto"
                />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faGithubAlt}
                  className="my-auto mx-auto"
                />
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* Panels container */}
      <div className="panels-container">
        {/* Left panel */}
        <div className="panel left-panel">
          <div className="content">
            <h3 id="text" className="loginh3">
              New here?
            </h3>
            <b>
              <i>
                <p id="text" className="loginp">
                  We're excited to have you join us! Our School Management
                  software is designed to make managing relationships easy. It
                  gives you tools and insights to connect better. Let's simplify
                  and improve how you do business together!
                </p>
              </i>
            </b>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Create New Account
            </button>
          </div>
          <img src={require('./client.png.png')} className="image" alt="" />
        </div>
        {/* Right panel */}
        <div className="panel right-panel">
          <div className="content">
            <h3 className="loginh3" id="text">
              One of us ?
            </h3>
            <p className="loginp" id="text">
              If you are an existing user, please click the button below.
            </p>
            <button
              onClick={handleSignInClick}
              className="btn transparent"
              id="sign-in-btn"
            >
              Log in
            </button>
            <img src={require('./client.png.png')} className="image" alt="" />
          </div>
          <img src="/img/dogLogin.svg" className="image" alt="" />
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success" id="text">
            Your account has been created successfully. You can now log in.{' '}
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Overview;
