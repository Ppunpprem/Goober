import { useState } from "react"; // Import useState
import { Link } from "react-router-dom"; // Import Link
import "./NavBar.css"; // Import the updated CSS
import logo from "../assets/logo.png"; // Replace with your actual logo path
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import check from "../assets/check-mark-button.png";
import cross from "../assets/cross-mark.png";
import organic from "../assets/organic.png";


// const defaultHomeFilters = {
//   generalWaste: { name: "General Waste", icon: bin, active: true },
//   recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
//   organicWaste: { name: "Organic Waste", icon: organic, active: true },
//   hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
// };

const NavBar = ({togglePopupVisibility }) => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [showSearchPopup, setShowSearchPopup] = useState(false);
  // const [homeFilters, setHomeFilters] = useState(defaultHomeFilters);

  const toggleAddPopup = () => {
    console.log("Toggling popup visibility");
    setMenuOpen(false);
    setShowAddPopup((prev) => !prev);
  };

  // const toggleSearchPopup = () => {
  //   setMenuOpen(false); 
  //   setShowSearchPopup((prev) => !prev); 
  // };

  // const resetHomeFilters = () => {
  //   const reset = Object.keys(homeFilters).reduce((acc, key) => {
  //     acc[key] = { ...homeFilters[key], active: true };
  //     return acc;
  //   }, {});
  //   setHomeFilters(reset);
  // };


  console.log("Popup visibility state:", showAddPopup); 

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Adidas Logo" className="w-16 h-16 object-contain" />
          <span className="text-xl font-medium text-[#17005a] leading-none py-3">TRASHCAN MAP</span>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex">
          <ul className="flex h-full items-center space-x-10 text-xl font-medium text-[#17005a]">
            <li>
              <Link to="/" className="hover:text-[#17005a]">Home</Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500" onClick={toggleAddPopup}>Add TrashCan</a>
            </li>
            <li>
              <Link to="/log-regist">
                <button className="bg-[#17005a] text-white px-2 py-1 rounded-lg hover:bg-gray-700 transition duration-300">
                  Login/Signup
                </button>
              </Link>
            </li>
          </ul>
        </nav>

      
        <div className="md:hidden block">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"} 
          >
            {menuOpen ? "✖" : "☰"} 
          </button>

            {/* Mobile Navbar */}
            <nav
              className={`absolute left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 text-lg font-medium text-gray-800 transform transition-all duration-500 ease-in-out ${
                menuOpen ? "translate-y-0 opacity-100 scale-100 pointer-events-auto" : "-translate-y-10 opacity-0 scale-95 pointer-events-none delay-100"
              }`}
            >
              <Link to="/" className=" text-[#17005a] hover:text-gray-500" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <a href="#" className="text-[#17005a] hover:text-gray-500" onClick={toggleAddPopup}>Add TrashCan</a>

              <a href="#" className="text-[#17005a] hover:text-gray-500" onClick={() => {togglePopupVisibility(); setMenuOpen(false);}}>
                Search
              </a>

              <Link to="/log-regist" onClick={() => setMenuOpen(false)}>
              <button className="bg-[#17005a] text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition duration-100">
                Login/Signup
              </button>
              </Link>

            </nav>
          </div>  
      </header>

      {showAddPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
        <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
          <h2 className="text-2xl font-bold text-[#17005a]">Add a Trashcan!</h2>
          <span className="text-black mt-2 justify-center">
            Please Log In/Sign Up first to add a trashcan.
          </span>

          <button
            onClick={toggleAddPopup}
            className="absolute top-3 right-3 text-white hover:text-gray-500 text-2xl"
          >
            ✖
          </button>

          <Link to="/log-regist">
            <button className="mt-4 bg-[#17005a] text-white px-5 py-2 rounded-lg hover:bg-[#0d003d] transition duration-300">
              Log In / Sign Up
            </button>
          </Link>
        </div>
      </div>
      )}  


      {/* Search Popup (Visible when toggled) */}
      {/* {showSearchPopup && (
        <div className="fixed -inset-1 flex items-center justify-center bg-transparent bg-opacity-50 z-[500]">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
            <h2 className="text-2xl font-bold text-[#17005a] pb-5">Search</h2>
            <div className="home-search-container mt-4">
              <img src={mag} alt="Search Icon" className="home-search-icon" />
              <input
                type="text"
                placeholder="Search Location..."
                className="home-search-bar"
              />
              <button className="home-search-button">Search</button>
            </div>
            
            <div className="home-filter-section mt-6">
              <h3 className="flex items-center justify-between">
                <img src={filter} alt="Filter Icon" className="home-icon" /> Filter
                <span className="home-reset-filter" onClick={resetHomeFilters}>
                  Reset Filter
                </span>
              </h3>
              {Object.entries(homeFilters).map(([key, { name, icon, active }]) => (
                <div className="home-filter-option" key={key}>
                  <img src={icon} alt={name} className="home-icon" /> {name}
                  <label className="home-switch">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleHomeFilter(key)}
                    />
                    <span className="home-slider"></span>
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={toggleSearchPopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✖
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default NavBar;
