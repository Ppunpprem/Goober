import trashcan from '../assets/trashcan.jpg'; // Import the background image
import logo from '../assets/logo.png';
import usericon from '../assets/usericon.png';
import pwdicon from '../assets/pwdicon.png';
import { Link } from 'react-router-dom'; // Import Link
import './Log_and_Regist.css'; // Import any styles if needed

const LogPage = () => {
  const appStyle = {
    backgroundImage: `url(${trashcan})`, // Set the background image
    backgroundSize: 'cover', // Ensure the image covers the entire screen proportionally
    backgroundPosition: 'center', // Center the image on the screen
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    height: '100vh', // Full vertical height
    width: '100vw', // Full horizontal width
    margin: 0, // Remove any default margin
    padding: 0, // Remove any default padding
    overflow: 'hidden', // Prevent scrolling if the image overflows
    position: 'absolute', // Position it absolutely
    top: 0,
    left: 0, // Ensure it stretches to the edges of the viewport
  };

  const contentStyle = {
    color: '#fff', // White text for contrast
    textAlign: 'center', // Center text horizontally
    fontSize: '2rem', // Adjust the font size
    zIndex: 2, // Ensure content appears above the background
    position: 'relative', // Required to ensure the content stays on top of the background
  };

  return (
    <div style={appStyle}>
      <div style={contentStyle}>
        <p1 className="underlinetext">TRASHCAN MAP
          <img src={logo} width="100" height="100" alt="Logo" />
        </p1>
        <div className="signup-container">
          <p>Sign Up</p>
          <Link to="/info-regist">
            <button id="signup-container a" className="regist-button">Register</button>
          </Link>
        </div>

        <div>
          <p className="or-text">OR</p>
        </div>

        <div>
          <p className="log-in">Log In</p>
          <p className="log-in-user">Log in with Username</p>
        </div>

        <div className="auth-box">
          <div className="input-field">
            <img src={usericon} alt="Email Icon" className="icon" />
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-field">
            <img src={pwdicon} alt="Password Icon" className="icon" />
            <input type="password" placeholder="Enter your password" />
          </div>
        </div>

        <div>
          <Link to="/home_after_login" className="login-container">
            <button className="login-button">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
