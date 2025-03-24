import { useState, useEffect } from "react";
import "./H_ALog_Page.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import check from "../assets/check-mark-button.png";
import cross from "../assets/cross-mark.png";
import organic from "../assets/organic.png";
import MapComp from "../components/MapComp.jsx";
import ToiletM2 from "../components/ToiletM2.jsx";
import { First_test_building, commnents } from "../Damo_data/bindata";

var Check_type_general_waste;
if (First_test_building.general_waste) {
  Check_type_general_waste = <img src={check} width={24} height={24}></img>;
} else {
  Check_type_general_waste = <img src={cross} width={24} height={24}></img>;
}

var Check_type_recycle_waste;
if (First_test_building.recycle_waste) {
  Check_type_recycle_waste = <img src={check} width={24} height={24}></img>;
} else {
  Check_type_recycle_waste = <img src={cross} width={24} height={24}></img>;
}

var Check_type_organic_waste;
if (First_test_building.organic_waste) {
  Check_type_organic_waste = <img src={check} width={24} height={24}></img>;
} else {
  Check_type_organic_waste = <img src={cross} width={24} height={24}></img>;
}

var Check_type_hazardous_waste;
if (First_test_building.hazardous_waste) {
  Check_type_hazardous_waste = <img src={check} width={24} height={24}></img>;
} else {
  Check_type_hazardous_waste = <img src={cross} width={24} height={24}></img>;
}

const defaultFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: false },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: false },
  organicWaste: { name: "Organic Waste", icon: organic, active: false },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: false },
};

const H_ALog_Page = ({ isPopupVisible, togglePopupVisibility }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [binNameFilter, setBinNameFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <-- ADDED: Track login state

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Enable scrolling on cleanup
    };
  }, []);

  const toggleFilter = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        active: !prev[filterKey].active,
      },
    }));
  };

  const resetFilters = () => {
    const reset = Object.keys(filters).reduce((acc, key) => {
      acc[key] = { ...filters[key], active: false };
      return acc;
    }, {});
    setFilters(reset);
  };

  const [commentText, setCommentText] = useState("");

  const handleCancel = () => {
    setCommentText("");
  };

  const [selected, setSelected] = useState(null);

  return (
    <div className="alog-page">
      {/* Always Visible Search & Filter Popup */}
      <div className="map-container">
        <MapComp
          setShowHomePopup={setShowPopup}
          setSelectedMarker={setSelectedMarker}
          homeFilters={filters}
          binNameFilter={binNameFilter}
        />
      </div>
      <div
        className={`alog-popup ${isPopupVisible ? "block" : "hidden"} md:block`}
      >
        <span
          className="md:hidden absolute top-2 right-1 text-[#17005a] bg-white text-xl p-2 font-medium cursor-pointer hover:bg-[#54008a] focus:outline-none"
          onClick={togglePopupVisibility}
        >
          X
        </span>
        <div className="pb-0 text-[#17005a] text-xl font-bold text-left">
          Search
        </div>
        <div className="alog-search-container">
          <img src={mag} alt="Search Icon" className="alog-search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="alog-search-bar"
            value={binNameFilter}
            onChange={(e) => setBinNameFilter(e.target.value)}
          />
          {/* <button
            className="home-search-button"
            onClick={() => setBinNameFilter("")}
          >
            Clear
          </button>{" "} */}
        </div>

        <div className="alog-filter-section">
          <h3>
            <img src={filter} alt="Filter Icon" className="alog-icon" /> Filter
            <span className="alog-reset-filter" onClick={resetFilters}>
              Reset Filter
            </span>
          </h3>
          {Object.entries(filters).map(([key, { name, icon, active }]) => (
            <div className="alog-filter-option" key={key}>
              <img src={icon} alt={name} className="alog-icon" /> {name}
              <label className="alog-switch">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleFilter(key)}
                />
                <span className="alog-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {showPopup && selectedMarker && (
        <ToiletM2
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          toiletData={{
            // Use the actual marker data
            id: selectedMarker.id,
            name:
              selectedMarker.name ||
              `Bin at (${selectedMarker.lat.toFixed(
                6
              )}, ${selectedMarker.lng.toFixed(6)})`,
            generalWaste: selectedMarker.generalWaste,
            recycleWaste: selectedMarker.recycleWaste,
            organicWaste: selectedMarker.organicWaste,
            hazardousWaste: selectedMarker.hazardousWaste,
            floor: selectedMarker.floor,
            infoCorrection: selectedMarker.infoCorrection,
            // Add any other properties you need
          }}
          setIsLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default H_ALog_Page;
