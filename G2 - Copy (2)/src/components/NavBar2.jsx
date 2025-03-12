import "./NavBar2.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import bin from "../assets/bin.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import organic from "../assets/organic.png";
import { useUser } from "../context/UserContext"; // Import the useUser hook


const NavBar2 = () => {

  const { user, updateUser } = useUser(); // Use the context to get user data and the update function

  const [showPopup, setShowPopup] = useState(false);
  const [showAddTrashcanPopup, setShowAddTrashcanPopup] = useState(false);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null); // Initial user state is null
  const [loading, setLoading] = useState(true); // Loading state to indicate data fetching

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/auth/profile", {
          method: "GET",
          headers: { "x-auth-token": token },
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        updateUser(data);
        console.log(updateUser)
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [updateUser]);

  // Handle user logout
  const handleLogout = () => {
    try {
      localStorage.removeItem("token"); // Remove token from localStorage
      updateUser(null); // Clear user data from context
      setShowPopup(false); // Close the popup menu
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const togglePopup = () => {
    const newState = !showPopup;
    setShowPopup(newState);
    // เพิ่ม class ให้กับ body เพื่อป้องกันการเลื่อนหน้าจอเมื่อเปิด popup
    if (newState) {
      document.body.classList.add('menu-open');
      // เพิ่ม event listener สำหรับการกดที่ใดก็ได้บนหน้าจอ
      setTimeout(() => {
        document.addEventListener('click', handleGlobalClick);
        document.addEventListener('touchend', handleGlobalClick);
      }, 100);
    } else {
      document.body.classList.remove('menu-open');
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchend', handleGlobalClick);
    }
  };

  // ฟังก์ชันสำหรับการกดที่ใดก็ได้บนหน้าจอ
  const handleGlobalClick = (e) => {
    const userMenu = document.getElementById('userMenu');
    const userInfo = document.querySelector('.user-info');
    
    if (userMenu && userInfo && 
        !userMenu.contains(e.target) && 
        !userInfo.contains(e.target)) {
      setShowPopup(false);
      document.body.classList.remove('menu-open');
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchend', handleGlobalClick);
    }
  };

  // เพิ่ม event listener เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // ตรวจสอบว่าเป็นอุปกรณ์มือถือหรือไม่
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    // ถ้าเป็นมือถือให้เพิ่ม event listener สำหรับการแตะ
    if (isMobile) {
      const userInfo = document.querySelector('.user-info');
      if (userInfo) {
        userInfo.addEventListener('touchend', (e) => {
          e.preventDefault();
          e.stopPropagation();
          togglePopup();
        });
      }
    }
    
    return () => {
      // ลบ event listener เมื่อคอมโพเนนต์ถูกทำลาย
      const userInfo = document.querySelector('.user-info');
      if (userInfo && window.matchMedia('(max-width: 768px)').matches) {
        userInfo.removeEventListener('touchend', togglePopup);
      }
    };
  }, []);
  const toggleAddTrashcanPopup = () => setShowAddTrashcanPopup((prev) => !prev);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuContainer = document.querySelector('.menu-container');
      const userInfo = document.querySelector('.user-info');
      
      if (showPopup && menuContainer && userInfo && 
          !menuContainer.contains(event.target) && 
          !userInfo.contains(event.target)) {
        setShowPopup(false);
        document.body.classList.remove('menu-open');
      }
    };

    // ใช้ทั้ง mousedown และ touchstart เพื่อรองรับทั้ง desktop และ mobile
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, [showPopup]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/home_after_login" className="brand">
            <img src={logo} alt="Trashcan Map Logo" className="brand-logo" />
            <h1 className="brand-name">TRASHCAN MAP</h1>
          </Link>
          <div className="nav-links">
            <Link to="/home_after_login" className="nav-link">Home</Link>
            <div className="nav-link" onClick={toggleAddTrashcanPopup}>
              Add a trashcan
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-menu">
            <div className="user-info" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              togglePopup();
            }}>
              <span className="user-name">
                {loading ? "Loading..." : user ? user.username : "Guest"}
              </span>
              <img 
                src={user?.profilePhoto || logo} 
                alt="User Profile" 
                className="user-avatar" 
              />
            </div>
            {showPopup && (
              <div 
                className="menu-container show-menu" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                style={{ display: 'flex' }}
                id="userMenu"
              >
              <Link to="/edit" className="edit-link" onClick={() => {
                setShowPopup(false);
                document.body.classList.remove('menu-open');
              }}>
                Edit Profile
              </Link>
              <Link to="/badges" className="edit-link" onClick={() => {
                setShowPopup(false);
                document.body.classList.remove('menu-open');
              }}>
                My Badges
              </Link>
              <button className="edit-link logout" onClick={handleLogout}>
                Log Out
              </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddTrashcanPopup && (
        <div className="popup-addtrashcan">
          <div className="addtrashcan-container">
            <h2>Add a Trashcan!</h2>

            <div className="input-group">
              <label>1. Pin a Location</label>
            </div>

            <div className="input-group inline-group">
              <div className="form-field">
                <label>2. Location</label>
                <input type="text" placeholder="Location Name" />
              </div>

              <div className="form-field">
                <label>Floor</label>
                <input
                  type="number"
                  placeholder="Floor?"
                  min="0"
                  onChange={(f) => {
                    if (f.target.value < 0 || f.target.value > 9) {
                      f.target.value = 0; // Reset to 0 if the input is negative
                    }
                  }}
                />
              </div>
            </div>

            <div className="trashcan-types">
              <div className="trashcan-header">
                <label className="trashcan-type-label">3. Trashcan Type</label>
                <div className="yes-no-labels">
                  <span>Yes</span>
                  <span>No</span>
                </div>
              </div>

              <div className="trashcan-row">
                <img src={bin} alt="General Waste" />
                <span>General Waste</span>
                <div className="radio-group">
                  <input type="radio" name="general" value="yes" />
                  <input type="radio" name="general" value="no" />
                </div>
              </div>

              <div className="trashcan-row">
                <img src={recycle} alt="Recycle Waste" />
                <span>Recycle Waste</span>
                <div className="radio-group">
                  <input type="radio" name="recycle" value="yes" />
                  <input type="radio" name="recycle" value="no" />
                </div>
              </div>

              <div className="trashcan-row">
                <img src={organic} alt="Organic Waste" />
                <span>Organic Waste</span>
                <div className="radio-group">
                  <input type="radio" name="organic" value="yes" />
                  <input type="radio" name="organic" value="no" />
                </div>
              </div>

              <div className="trashcan-row">
                <img src={hazard} alt="Hazardous Waste" />
                <span>Hazardous Waste</span>
                <div className="radio-group">
                  <input type="radio" name="hazardous" value="yes" />
                  <input type="radio" name="hazardous" value="no" />
                </div>
              </div>
            </div>

            <div className="button-group">
              <button onClick={toggleAddTrashcanPopup}>Cancel</button>
              <button onClick={toggleAddTrashcanPopup}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar2;
