import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trashcan from '../assets/trashcan.jpg'; // Import background image
import logo from '../assets/logo.png';
import usericon from '../assets/usericon.png';
import pwdicon from '../assets/pwdicon.png';
import { Link } from 'react-router-dom';
import './Log_and_Regist.css';

const LogPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/home_after_login'); // Redirect after login
      } else {
        alert(data.msg || 'Invalid credentials');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const appStyle = {
    backgroundImage: `url(${trashcan})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const contentStyle = {
    color: '#fff',
    textAlign: 'center',
    fontSize: '2rem',
    zIndex: 2,
    position: 'relative',
  };

  return (
    <div style={appStyle}>
      <div style={contentStyle}>
        <p className="underlinetext">
          TRASHCAN MAP 
          <img src={logo} width="100" height="100" alt="Logo" />
        </p>

        {/* Sign Up Section */}
        <div className="signup-container">
          <p>Sign Up</p>
          <Link to="/info-regist">
            <button className="regist-button">Register</button>
          </Link>
        </div>

        <p className="or-text">OR</p>

        {/* Log In Section */}
        <p className="log-in">Log In</p>
        {/* <p className="log-in-user">Log in with Username</p> */}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="auth-box">
          <div className="input-field">
            <img src={usericon} alt="Email Icon" className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <img src={pwdicon} alt="Password Icon" className="icon" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default LogPage;
