import { useState, useEffect } from "react";
import "./HomePage.css";
import bin from "../assets/bin.png";
import filter from "../assets/filter.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import mag from "../assets/mag.png";
import check from "../assets/check-mark-button.png";
import cross from "../assets/cross-mark.png";
import organic from "../assets/organic.png";
import MapComp from "../components/Mapcomp";


import { First_test_building, commnents } from "../Damo_data/bindata";

const defaultHomeFilters = {
  generalWaste: { name: "General Waste", icon: bin, active: true },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
  organicWaste: { name: "Organic Waste", icon: organic, active: true },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
};

const HomePage = () => {
  const [homeFilters, setHomeFilters] = useState(defaultHomeFilters);
  const [showHomePopup, setShowHomePopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleHomeFilter = (filterKey) => {
    setHomeFilters((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        active: !prev[filterKey].active,
      },
    }));
  };

  const resetHomeFilters = () => {
    const reset = Object.keys(homeFilters).reduce((acc, key) => {
      acc[key] = { ...homeFilters[key], active: true };
      return acc;
    }, {});
    setHomeFilters(reset);
  };

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

  // const [commentText, setCommentText] = useState("");

  // const handleCancel = () => {
  //   setCommentText("");
  // };

  const [selected, setSelected] = useState(null);

  return (
    <div className="home-page">
      <div className="map-container">
        <MapComp 
        setShowHomePopup={setShowHomePopup} 
        setSelectedMarker={setSelectedMarker} />
      </div>
      <div className="home-popup">
        <h2>Search</h2>
        <div className="home-search-container">
          <img src={mag} alt="Search Icon" className="home-search-icon" />
          <input
            type="text"
            placeholder="Search Location..."
            className="home-search-bar"
          />
          <button className="home-search-button">Search</button>
        </div>

        <div className="home-filter-section">
          <h3>
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
      </div>

      <button
        className="home-circle-button"
        onClick={() => setShowHomePopup(true)}
      >
        <div className="home-add-button">+</div>
      </button>

       {showHomePopup && selectedMarker && (
        <div className={`info-popup ${showHomePopup ? "show" : ""}`}>
          <div className="flex-container">
            <div className="flex-container-inner">
              <button
                className="close-button"
                onClick={() => setShowHomePopup(false)}
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
                // <ul className="trash-type-container">
                // <li>
                //   <div className="trash-type">
                //     <img src={bin} width={24} height={24}></img>
                //     <div>General Waste </div>
                //     {Check_type_general_waste}
                //   </div>
                // </li>
                // <li></li>
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
              <h4>! Please Login first to comment !</h4>
              {/* <h4>Post a Comment</h4>
                      <textarea
                        className="user_comment"
                        name="postComment"
                        placeholder="Say something..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
        
                      <div className="sent_comment">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={() => setShowHomePopup(false)}>Post</button>
                      </div> */}
            </div>

            {/* <div className="flex-container-inner">
                      <div>1.1</div>
                      <div>1.2</div>
                    </div>
                    <div className="flex-container-inner">
                      <div>2.1</div>
                      <div>2.2</div>
                    </div>
                    <div>3</div>
                    <div>4</div> */}
            {/* <div className="flex-container">
                      <h3>{First_test_building.building_name}</h3>
                      <h2>{First_test_building.floor_number}th Floor</h2>
                      <h3>Is this infomation correct?</h3>
                    </div>
                    <div className="flex-container">
                      <h3>Comments</h3>
                      <h1>{First_comment}</h1>
                    </div>
                    <div>
                      <button onClick={() => setShowPopup(false)}>Close</button>
                    </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
