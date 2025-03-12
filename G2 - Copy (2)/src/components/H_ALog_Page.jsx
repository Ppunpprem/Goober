import { useState, useEffect } from "react";
import "./H_ALog_Page.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import MapComp from "./MapComp";
import ToiletModal from "./ToiletModal";

const defaultFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: true },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
};

const H_ALog_Page = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // เพิ่ม log
  useEffect(() => {
    console.log('showHomePopup:', showHomePopup);
    console.log('selectedMarker:', selectedMarker);
  }, [showHomePopup, selectedMarker]);

  const getToiletData = (marker) => {
    // ในอนาคตเราสามารถดึงข้อมูลจาก API หรือ database ตาม marker.lat และ marker.lng ได้
    return {
      name: `Toilet at (${marker.lat.toFixed(6)}, ${marker.lng.toFixed(6)})`,
      hasWomen: true,
      hasMen: true,
      isAccessible: false,
      isGenderNeutral: false,
      hasChildren: false,
      hasBabyChanging: true,
      fee: "Free",
      notes: "Public toilet",
      lastVerified: new Date().toLocaleString()
    };
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; //pppppp
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
      acc[key] = { ...filters[key], active: true };
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
          setShowHomePopup={setShowHomePopup}
          setSelectedMarker={setSelectedMarker}
        />
      </div>
      <div className="alog-popup">
        <h2>Search</h2>
        <div className="alog-search-container">
          <img src={mag} alt="Search Icon" className="alog-search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="alog-search-bar"
          />
          <button className="alog-search-button">Search</button>
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

      {/* Toilet Info Popup */}
      {showHomePopup && selectedMarker && <ToiletModal
        isOpen={true}
        onClose={() => setShowHomePopup(false)}
        toiletData={{
          name: `Toilet at (${selectedMarker.lat.toFixed(6)}, ${selectedMarker.lng.toFixed(6)})`,
          hasWomen: true,
          hasMen: true,
          isAccessible: false,
          isGenderNeutral: false,
          hasChildren: false,
          hasBabyChanging: true,
          fee: "Free",
          notes: "Public toilet",
          lastVerified: new Date().toLocaleString()
        }}
      />}
    </div>
  );
};

export default H_ALog_Page;


