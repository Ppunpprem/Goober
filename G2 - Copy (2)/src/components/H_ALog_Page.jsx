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
        <div className="pb-5 text-[#17005a] text-xl font-bold">Search</div>
        <div className="alog-search-container">
          <img src={mag} alt="Search Icon" className="alog-search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="alog-search-bar"
            value={binNameFilter}
            onChange={(e) => setBinNameFilter(e.target.value)}
          />
          <button
            className="home-search-button"
            onClick={() => setBinNameFilter("")}
          >
            Clear
          </button>{" "}
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

      {/* Hello Popup */}
      {showPopup && selectedMarker && (
        <div className={`info-popup ${showPopup ? "show" : ""}`}>
          <div className="flex-container">
            <div className="flex-container-inner">
              <button
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>
              <h3>{First_test_building.building_name}</h3>
              <h2>{First_test_building.floor_number}th Floor</h2>
              <h4>Is this information correct?</h4>
              <div className="container">
                {selected === null && (
                  <div className="button-group">
                    <button
                      className={
                        selected === "yes"
                          ? "yes-button selected"
                          : "yes-button"
                      }
                      onClick={() => setSelected("yes")}
                    >
                      Yes
                    </button>
                    <button
                      className={
                        selected === "no" ? "no-button selected" : "no-button"
                      }
                      onClick={() => setSelected("no")}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
              <div>
                {selected === "yes" && <h5>Thanks! for your answer</h5>}
                {selected === "no" && (
                  <h5>Please comment the correct information</h5>
                )}
              </div>
            </div>
            <div className="flex-container-inner">
              <h4>Features</h4>
              <ul className="trash-type-container">
                <li>
                  <div className="trash-type">
                    <img src={bin} width={24} height={24}></img>
                    <div>General Waste </div>
                    {Check_type_general_waste}
                  </div>
                </li>
                <li>
                  <div className="trash-type">
                    <img src={recycle} width={24} height={24}></img>
                    <div>Recycle Waste</div>
                    {Check_type_recycle_waste}
                  </div>
                </li>
                <li>
                  <div className="trash-type">
                    <img src={organic} width={24} height={24}></img>
                    <div>Organic Waste</div>
                    {Check_type_organic_waste}
                  </div>
                </li>
                <li>
                  <div className="trash-type">
                    <img src={hazard} width={24} height={24}></img>
                    <div>Hazardous Waste</div>
                    {Check_type_hazardous_waste}
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex-container-inner">
              <h4>{commnents.length} Comments</h4>
              {commnents.map((comment, index) => (
                <div key={index} className="comment">
                  <img
                    src={comment.profile}
                    className="profile-picture"
                    width={32}
                    height={32}
                  ></img>
                  <div key={index} className="comment_format">
                    {comment.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-container-inner">
              <h4>Post a Comment</h4>
              <textarea
                className="user_comment"
                name="postComment"
                placeholder="Say something..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <div className="sent_comment">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={() => setShowPopup(false)}>Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default H_ALog_Page;
