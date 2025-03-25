import "./NavBar2.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import bin from "../assets/bin.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import organic from "../assets/organic.png";

import { useLocation } from "../context/LocationContext";

const NavBar2 = ({ toggleSearch, togglePopupVisibility }) => {
  const { user, updateUser } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [showAddTrashcanPopup, setShowAddTrashcanPopup] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isPinning, setIsPinning] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const {
    lastLocation,
    setLastLocation,
    clearLocation,
    isAddingTrashCan,
    setIsAddingTrashCan,
  } = useLocation();
  const [binNameLocation, setBinNameLocation] = useState("");
  const [binFloorNumber, setBinFloorNumber] = useState("");
  const [binFeatures, setBinFeatures] = useState({
    generalWaste: false,
    recycleWaste: false,
    organicWaste: false,
    hazardousWaste: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
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

        // console.log(updateUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [updateUser]);

  useEffect(() => {
    if (lastLocation) {
      setTimeout(() => {
        setIsPinning(false);
      }, 500); // Delay of 500ms (adjust as needed)
    }
  }, [lastLocation]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleAddTrashcanPopup = () => {
    setMenuOpen(false);
    setShowAddTrashcanPopup((prev) => !prev);
  };

  const toggleUser = () => {
    setMenuOpen(false); // Close the mobile menu
    setShowProfileDropdown((prevState) => !prevState); // Toggle the dropdown visibility
  };

  const handleAddTrashCanClick = () => {
    setIsAddingTrashCan(true); // Enable "adding trash can" mode
  };

  const handleFormSubmit = async () => {
    if (!lastLocation || !binNameLocation || !binFloorNumber) {
      setErrorMessage("Please select all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Token is not available.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/profile", {
        method: "GET",
        headers: { "x-auth-token": token },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setErrorMessage("Session expired. Please log in again.");
        } else {
          throw new Error("Failed to load profile");
        }
      }

      const user = await res.json();

      if (!user || !user.id) {
        setErrorMessage("User data is not available.");
        return;
      }

      console.log("User ID:", user.id);

      const data = {
        bin_location: {
          $lat: `${lastLocation.lat}`,
          $lng: `${lastLocation.lng}`,
        },
        bin_name_location: binNameLocation,
        bin_info_correction: 0,
        bin_floor_number: binFloorNumber,
        bin_features_general_waste: binFeatures.generalWaste,
        bin_features_recycle_waste: binFeatures.recycleWaste,
        bin_features_organic_waste: binFeatures.organicWaste,
        bin_features_hazardous_waste: binFeatures.hazardousWaste,
        user_id: user.id,
      };

      const response = await fetch("http://localhost:5001/api/bin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(
          `Failed to add trashcan: ${errorData.message || "Unknown error"}`
        );
      }

      const result = await response.json();
      console.log("Trashcan added successfully:", result);
      setSuccessMessage("Trashcan added successfully!");
      setTimeout(() => {
        setShowAddTrashcanPopup(false);
        setLastLocation(null);
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error adding trashcan:", error);
      setErrorMessage(
        error.message || "An error occurred while adding trashcan."
      );
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-medium text-[#17005a] leading-none py-3">
            TRASHCAN MAP
          </span>
          <img
            src={logo}
            alt="Adidas Logo"
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex">
          <ul className="flex h-full items-center space-x-10 text-xl font-medium text-[#17005a]">
            <li>
              <Link
                to="/home_after_login"
                className="hover:text-[#9AD4EC]"
                onClick={() => {
                  setShowProfileDropdown(false);
                  setShowAddTrashcanPopup(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#9AD4EC]"
                onClick={(e) => {
                  e.preventDefault(); // Prevents default anchor behavior (e.g., page scroll)
                  toggleAddTrashcanPopup();
                  setShowProfileDropdown(false); // Call the toggle function
                  // handleAddTrashcanClick(); // Call the handle click function
                  // handleAddTrashCanClick();
                }}
              >
                Add Trashcan
              </a>
            </li>
            <li>
              <div
                className="flex items-center gap-3 pl-1 px-3 py-3 font-medium text-xl rounded-2xl cursor-pointer hover:bg-gray-200 transition"
                onClick={() => {
                  toggleUser();
                  setShowAddTrashcanPopup(false);
                }}
              >
                <span>
                  {loading ? "Loading..." : user?.username || "Guest"}
                </span>
                <img
                  src={user?.profilePhoto || logo}
                  alt="profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </div>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <div className="flex flex-col">
                    <Link
                      to="/edit"
                      className="px-4 py-2 text-gray-700 hover:text-blue-300 rounded-t-lg text-center"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowAddTrashcanPopup(false);
                      }}
                    >
                      Edit
                    </Link>
                    <hr></hr>
                    <Link
                      to="/badges"
                      className="px-4 py-2 text-gray-700 hover:text-blue-300 text-center"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowAddTrashcanPopup(false);
                      }}
                    >
                      Badges
                    </Link>
                    <hr></hr>
                    <span
                      className="px-4 py-2 text-gray-700 hover:text-blue-300 rounded-b-lg text-center"
                      onClick={handleLogout}
                    >
                      Log Out
                    </span>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="md:hidden block">
          {/* Menu Button */}
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setShowProfileDropdown(false);
            }}
            className="text-3xl cursor-pointer bg-[#17005a] text-white px-4 py-2 rounded-md"
            aria-label={
              menuOpen && !showProfileDropdown ? "Close menu" : "Open menu"
            }
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
              to="/home_after_login"
              className="text-[#17005a] hover:text-gray-500"
              onClick={() => {
                setMenuOpen(false);
                setShowAddTrashcanPopup(false);
              }}
            >
              Home
            </Link>
            <a
              href="#"
              className="text-[#17005a] hover:text-gray-500"
              onClick={() => {
                toggleAddTrashcanPopup();
                toggleSearch();
              }}
            >
              Add TrashCan
            </a>
            <a
              href="#"
              className="text-[#17005a] hover:text-gray-500"
              onClick={() => {
                togglePopupVisibility();
                setShowAddTrashcanPopup(false);
                setMenuOpen(false);
              }}
            >
              Search
            </a>

            {/* Profile Section */}
            <div
              className="flex items-center gap-3 pl-1 px-3 py-3 font-medium text-xl rounded-2xl cursor-pointer hover:bg-gray-200 transition"
              onClick={toggleUser}
            >
              <span>{loading ? "Loading..." : user?.username || "Guest"}</span>
              <img
                src={user?.profilePhoto || logo}
                alt="profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Add Trashcan Popup */}

      {/* Add Trashcan Popup */}
      {showAddTrashcanPopup && (
        <div
          className={`fixed top-16 sm:top-20 right-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 ${
            isPinning ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="bg-white p-6 rounded-3xl shadow-xl w-96 max-w-xs sm:max-w-md max-h-[90dvh] overflow-y-auto">
            <h2 className="text-[#17005a] text-xs sm:text-3xl font-semibold mb-4 text-center">
              Add a Trashcan!
            </h2>

            {/* Success Message */}
            {successMessage && (
              <div className="text-[#17005a] text-lg mb-4">
                {successMessage}
              </div>
            )}

            {/* Location Selection */}
            <div className="mb-4">
              <label className="font-medium text-[#17005a] text-lg sm:text-2xl">
                1. Pin a Location
                <button
                  className="bg-[#17005a] text-[#9AD4EC] text-base font-semibold px-4 py-2 rounded-3xl hover:bg-[#9AD4EC] hover:text-[#17005a] m-2 hover:cursor-pointer transition duration-300 transform hover:scale-105 flex items-center"
                  onClick={() => {
                    setIsAddingTrashCan(true);
                    setIsPinning(true);
                  }}
                >
                  Click
                </button>
                {isAddingTrashCan && (
                  <h6 className="text-gray-500 text-sm font-semibold m-2">
                    Click anywhere on the map to pin the location!
                  </h6>
                )}
              </label>
              {/* Display the last clicked location */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4 w-fit">
                <div className="text-[#17005a] font-semibold">Location:</div>
                {lastLocation ? (
                  <div className="text-[#17005a]-800 flex flex-col">
                    <strong className="text-[#17005a]-500">Lat:</strong>{" "}
                    {lastLocation.lat},
                    <strong className="text-[#17005a]-500">Lng:</strong>{" "}
                    {lastLocation.lng}
                  </div>
                ) : (
                  <span className="text-[#17005a]-500 italic">
                    Location not selected
                  </span>
                )}
              </div>

              {lastLocation && (
                <button
                  className="bg-[#9AD4EC] text-[#17005a] text-base font-semibold px-4 py-2 rounded-3xl hover:bg-[#17005a] hover:text-[#9AD4EC] m-2 hover:cursor-pointer transition duration-300 transform hover:scale-105 flex items-center"
                  onClick={clearLocation}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="text-[#17005a] text-lg sm:text-2xl font-medium">
                  2. Location
                </label>
                <input
                  type="text"
                  placeholder="Location Name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-[#17005a]-800"
                  value={binNameLocation}
                  onChange={(e) => setBinNameLocation(e.target.value)}
                />
              </div>

              <div className="w-24">
                <label className="block text-[#17005a] text-lg sm:text-2xl font-semibold">
                  Floor
                </label>
                <input
                  type="text"
                  placeholder="Floor?"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  value={binFloorNumber}
                  onChange={(e) => setBinFloorNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Trashcan Types */}
            <div className="mb-4">
              <label className="block font-medium text-[#17005a] text-lg sm:text-2xl mb-2">
                3. Trashcan Type
              </label>
              {[
                { name: "General Waste", icon: bin, key: "generalWaste" },
                { name: "Recycle Waste", icon: recycle, key: "recycleWaste" },
                { name: "Organic Waste", icon: organic, key: "organicWaste" },
                {
                  name: "Hazardous Waste",
                  icon: hazard,
                  key: "hazardousWaste",
                },
              ].map((trashcan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-2 rounded-lg mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={trashcan.icon}
                      alt={trashcan.name}
                      className="w-6 h-6"
                    />
                    <span className="text-gray-700">{trashcan.name}</span>
                  </div>

                  <div className="flex space-x-3">
                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name={trashcan.key}
                        value="yes"
                        className="peer hidden"
                        checked={binFeatures[trashcan.key] === true}
                        onChange={() =>
                          setBinFeatures((prev) => ({
                            ...prev,
                            [trashcan.key]: true,
                          }))
                        }
                      />
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:border-[#17005a] peer-checked:bg-[#17005a]"></div>
                      <span className="text-gray-600 peer-checked:text-[#17005a]-500">
                        Yes
                      </span>
                    </label>

                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name={trashcan.key}
                        value="no"
                        className="peer hidden"
                        checked={binFeatures[trashcan.key] === false}
                        onChange={() =>
                          setBinFeatures((prev) => ({
                            ...prev,
                            [trashcan.key]: false,
                          }))
                        }
                      />
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full peer-checked:border-[#17005a] peer-checked:bg-[#17005a]"></div>
                      <span className="text-gray-600 peer-checked:text-[#17005a]-500">
                        No
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-[#9AD4EC] text-[#17005a] text-base font-semibold px-4 py-2 rounded-3xl hover:bg-[#17005a] hover:text-[#9AD4EC] m-2 hover:cursor-pointer transition duration-300 transform hover:scale-105 flex items-center"
                onClick={toggleAddTrashcanPopup}
              >
                Cancel
              </button>
              <button
                className="bg-[#17005a] text-[#9AD4EC]  text-base font-semibold px-4 py-2 rounded-3xl hover:bg-[#9AD4EC] hover:text-[#17005a] m-2 hover:cursor-pointer transition duration-300 transform hover:scale-105 flex items-center"
                onClick={handleFormSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <div
          className={`md:hidden absolute left-0 top-15 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-[1000] 
      transform transition-all duration-700 ease-in-out ${
        showProfileDropdown
          ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          : "-translate-y-10 opacity-0 scale-95 pointer-events-none delay-100"
      }`}
        >
          <div className="flex flex-col text-center py-4 space-y-4 text-lg font-medium text-[#17005a] hover:text-gray-500">
            <div
              className="flex items-center justify-center gap-3 font-medium text-xl rounded-2xl cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setMenuOpen(true);
                setShowProfileDropdown(false);
              }}
            >
              <Link>{loading ? "Loading..." : user?.username || "Guest"}</Link>
              <img
                src={user?.profilePhoto || logo}
                alt="profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </div>
            <Link
              to="/edit"
              className="text-[#17005a] hover:text-blue-300 rounded-t-lg"
              onClick={() => setShowProfileDropdown(false)}
            >
              Edit
            </Link>
            <Link
              to="/badges"
              className=" text-[#17005a] hover:text-blue-300"
              onClick={() => setShowProfileDropdown(false)}
            >
              Badges
            </Link>
            <a
              className="text-[#17005a] hover:text-blue-300 rounded-b-lg"
              onClick={handleLogout}
            >
              Log Out
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar2;
