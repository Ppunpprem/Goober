import { useState, useRef } from "react"; // Import React, useState, and useRef
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import NavBar from "./NavBar"; // Import the NavBar component
import "./Info_Regist_Page.css"; // Import global styles

const InfoRegistPage = () => {
  const [profilePhoto, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store actual file
  const fileInputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file)); // Create preview URL
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Use ref to trigger file input
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("homeAddress", homeAddress);
      formData.append("username", username);
      formData.append("password", password);

      if (imageFile) formData.append("profilePhoto", imageFile); // Append actual file

      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        body: formData, // No need for headers, `FormData` sets them automatically
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        const userResponse = await fetch(
          "http://localhost:5001/api/auth/profile",
          {
            headers: {
              "x-auth-token": data.token,
            },
          }
        );

        if (userResponse.ok) {
          navigate("/home_after_login");
          alert("Registration successful!");
        }
      } else {
        alert(data.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app-container" style={{ overflowY: "auto" }}>
      <NavBar />
      <main className="content-container">
        <h1 className="information-title">Information</h1>
        <div className="form-container">
          <div className="profile-section">
            <p className="acc">Account Image</p>
            <div className="profile-image-placeholder" onClick={handleClick}>
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <p className="placeholder-text">+</p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef} // Attach ref here
              onChange={handleImageUpload}
              hidden
            />
          </div>

          <form className="info-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>First name</label>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Middle name</label>
              <input
                type="text"
                placeholder="Middle name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Last name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Age</label>
              <input
                type="number"
                placeholder="Age"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Please choose your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="lgbtq">LGBTQ+</option>
                <option value="prefer-not-to-say">Do not want to tell</option>
              </select>
            </div>
            <div className="form-row">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Home Address</label>
              <input
                type="text"
                placeholder="Home Address"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="save-button">
              Save Me
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InfoRegistPage;
