import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import trashcanBackground from "../assets/trashcan_bg.jpg"; // Ensure this path is correct
import userIcon from "../assets/usericon.png";
import pwdIcon from "../assets/pwdicon.png";
import "./Log_and_Regist.css"; // Make sure this CSS file exists and is properly configured

const TrashcanMapAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/home_after_login");
      } else {
        alert(data.msg || "Invalid credentials");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  // Define the appStyle object for background image
  const appStyle = {
    backgroundImage: `url(${trashcanBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'absolute', // 'absolute' to make sure the background covers the full viewport
    top: 0,
    left: 0,
    zIndex: 0, // background should be behind the container
  };

  return (
    <div style={appStyle}>
      {/* Container with higher z-index */}
      <div className="auth-container">

        <h2 className="text-xl font-semibold text-indigo-800">Sign Up</h2>
        <Link to="/info-regist">
        <button className="auth-button">Register</button>

        </Link>

        <div className="my-4 text-gray-600">OR</div>

        <h2 className="text-xl font-semibold text-indigo-800">Log In</h2>
        <form onSubmit={handleLogin} className="mt-2 w-full">
        <div className="email-box-container">
          <span className="icon">
            <img src={userIcon} alt="User Icon" />
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-box"
          />
        </div>


        <div className="email-box-container">
        <span className="icon">
            <img src={pwdIcon} alt="Password Icon" className="pwd-icon text-gray-400" />
          </span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="email-box"
          />
        </div>


          <button type="submit" className="auth-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default TrashcanMapAuth;
