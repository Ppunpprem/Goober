import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar2.css";
import "./Info_Regist_Page.css";

const EditPage = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    homeAddress: "",
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/profile",
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        setUserData(response.data);
        setProfilePhoto(response.data.profilePhoto || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfilePhoto(imageUrl);
    setSelectedFile(file);
    // const formData = new FormData();
    // formData.append("profilePhoto", file);

  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to save changes?")) return;
  
    try {
      const formData = new FormData();
  
      if (selectedFile) {
        formData.append("profilePhoto", selectedFile);
      }
  
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });
  
      const response = await axios.put(
        "http://localhost:5001/api/auth/profile",
        formData, 
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setProfilePhoto(response.data.profilePhoto || profilePhoto);
      setNotification({
        message: "Profile updated successfully!",
        type: "success",
        visible: true,
      });
  
      setTimeout(
        () => setNotification((prev) => ({ ...prev, visible: false })),
        3000
      );
    } catch (err) {
      setNotification({
        message: "Error updating profile. Try again.",
        type: "error",
        visible: true,
      });
  
      setTimeout(
        () => setNotification((prev) => ({ ...prev, visible: false })),
        3000
      );
    }
  };
  

  return (
    <div className="app-container">
      <main className="content-container">
        <h1 className="information-title">
          {isEditing ? "Edit Information" : "Information"}
        </h1>

        {notification.visible && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="form-container">
          <div className="profile-section">
            <p className="acc">
              Account Image
            </p>
            <div className="profile-image-placeholder" onClick={handleClick} style={{
                cursor: isEditing ? "pointer" : "default", // Disable cursor when not in edit mode
              }}>
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
              ref={fileInputRef}
              onChange={handleImageUpload}
              hidden
              disabled={!isEditing} 
            />
          </div>

          <form className="info-form" onSubmit={handleSubmit}>
            {[
              { label: "First name", name: "firstName", type: "text" },
              { label: "Middle name", name: "middleName", type: "text" },
              { label: "Last name", name: "lastName", type: "text" },
              { label: "Age", name: "age", type: "number", min: "0" },
              { label: "Phone number", name: "phone", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Home Address", name: "homeAddress", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type, min }) => (
              <div className="form-row" key={name}>
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={userData[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className={isEditing ? "" : "no-edit"}
                  readOnly={!isEditing}
                  min={min}
                />
              </div>
            ))}

            <div className="form-row">
              <label>Gender</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                required
                disabled={!isEditing}
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

            <div
              className="form-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <button
                type="button"
                className="edit-toggle-button"
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  backgroundColor: isEditing ? "#4CAF50" : "#007BFF",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                {isEditing ? "Switch to View Mode" : "Switch to Edit Mode"}
              </button>

              {isEditing && (
                <button
                  type="submit"
                  className="save-button"
                  style={{
                    backgroundColor: "#17005A",
                    color: "white",
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditPage;
