import { useState } from "react"; // Import useState
import { Link } from "react-router-dom"; // Import Link
import "./NavBar.css"; // Import the updated CSS
import logo from "../assets/logo.png"; // Replace with your actual logo path

const NavBar = ({ togglePopupVisibility }) => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleAddPopup = () => {
    console.log("Toggling popup visibility");
    setMenuOpen(false);
    setShowAddPopup((prev) => !prev);
  };

  // console.log("Popup visibility state:", showAddPopup);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-medium text-[#17005a] leading-none py-3">
            TRASHCAN MAP
          </span>
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex">
          <ul className="flex h-full items-center space-x-10 text-xl font-medium text-[#17005a]">
            <li>
              <Link to="/" className="hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-500"
                onClick={toggleAddPopup}
              >
                Add Trashcan
              </a>
            </li>
            <li>
              <Link to="/log-regist" className="hover:text-gray-500">
                Login/Signup
              </Link>
            </li>
          </ul>
        </nav>

        {/* DropDown */}
        <div className="md:hidden block">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl cursor-pointer bg-[#17005a] text-white p-2 rounded-lg focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "✖" : "☰"}
          </button>

          {/* Mobile Navbar */}
          <nav
            className={`absolute left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 text-lg font-medium text-gray-800 transform transition-all duration-500 ease-in-out ${
              menuOpen
                ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
                : "-translate-y-10 opacity-0 scale-95 pointer-events-none delay-100"
            }`}
          >
            <Link
              to="/"
              className=" text-[#17005a] hover:text-gray-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <a
              href="#"
              className="text-[#17005a] hover:text-gray-500"
              onClick={toggleAddPopup}
            >
              Add TrashCan
            </a>

            <a
              href="#"
              className="text-[#17005a] hover:text-gray-500"
              onClick={() => {
                togglePopupVisibility();
                setMenuOpen(false);
              }}
            >
              Search
            </a>

            <Link
              to="/log-regist"
              onClick={() => setMenuOpen(false)}
              className="text-[#17005a] hover:text-gray-500"
            >
              Login/Signup
            </Link>
          </nav>
        </div>
      </header>

      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
            <h2 className="text-2xl font-bold text-[#17005a]">
              Add a Trashcan!
            </h2>
            <span className="text-[#17005a] mt-2 justify-center">
              Please Log In/Sign Up first to add a trashcan.
            </span>

            <button
              onClick={toggleAddPopup}
              className="absolute top-3 right-3 text-white hover:text-gray-500 text-2xl"
            >
              ✖
            </button>

            <Link to="/log-regist" onClick={toggleAddPopup}>
              <button className="mt-4 bg-[#17005a] text-white px-5 py-2 rounded-lg hover:bg-[#0d003d] transition duration-300">
                Log In / Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
