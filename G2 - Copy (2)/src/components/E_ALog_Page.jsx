import { useState } from 'react'; // Import React and useState
import NavBar from './NavBar'; // Import the NavBar component
import './Info_Regist_Page.css'; // Import global styles
import { Link} from 'react-router-dom'; // Import Link and useNavigate

const EditPage = () => {
  const [profileImage, setProfileImage] = useState(null); // State to store the image

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container">
      <NavBar /> {/* Use the imported NavBar component */}
      <main className="content-container">
        <h1 className="information-title">Information</h1>
        <div className="form-container">
          <div className="profile-section">
            <p className="acc">Account Image</p>
            {/* Circle for profile image */}
            <div className="profile-image-placeholder" onClick={() => document.querySelector('.image-upload').click()}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <p className="placeholder-text">+</p> // "+" sign displayed if no image
              )}
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              className="image-upload"
              onChange={handleImageUpload}
            />
          </div>
       
          <form className="info-form">
            <div className="form-row">
              <label>First name</label>
              <input type="text" placeholder="First name" />
            </div>
            <div className="form-row">
              <label>Middle name</label>
              <input type="text" placeholder="Middle name" />
            </div>
            <div className="form-row">
              <label>Last name</label>
              <input type="text" placeholder="Last Name" />
            </div>


            <div className="form-row">
              <label>Age</label>
              <input 
                type="number" 
                placeholder="Age" 
                min="0" 
                onChange={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0; // Reset to 0 if the input is negative
                  }
                }}
              />
            </div>


            <div className="form-row">
              <label>Gender</label>
              <select required>
                <option value="" disabled selected>Please choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="lgbtq">LGBTQ+</option>
                <option value="prefer-not-to-say">Do not want to tell</option>
              </select>
            </div>



            <div className="form-row">
              <label>Phone number</label>
              <input type="tel" placeholder="Phone number" />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </div>
            <div className="form-row">
              <label>Home Address</label>
              <input type="text" placeholder="Home Address" />
            </div>
            <div className="form-row">
              <label>Username</label>
              <input type="text" placeholder="Username" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <Link to="/log-regist">
              <button type="submit" className="save-button">Save Me</button>
            </Link>
            
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditPage;
