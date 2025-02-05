import './NavBar.css'; // Import the updated CSS
import logo from '../assets/logo.png'; // Replace with your actual logo path
import { Link} from 'react-router-dom'; // Import Link and useNavigate

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Navigation Links */}
        <div className="logo-container">
          <h1 className="navbar-title">TRASHCAN MAP</h1>
          <img src={logo} alt="logo" className="navbar-logo" />
          <Link to="/" className="navbar-link">Home</Link>
        
          <a href="/add-trashcan" className="navbar-link">Add a trashcan</a>
        </div>

        {/* Login/Register Link */}
        <div className="navbar-links">
          <Link to="/log-regist" className="navbar-link navbar-lr">Login/Register</Link>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;