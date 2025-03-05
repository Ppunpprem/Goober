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
import MapComp from "../components/Mapcomp";
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
  generalWaste: { name: "General Waste", icon: bin, active: true },
  recycleWaste: { name: "Recycle Waste", icon: recycle, active: true },
  organicWaste: { name: "Organic Waste", icon: organic, active: true },
  hazardousWaste: { name: "Hazardous Waste", icon: hazard, active: true },
};

const H_ALog_Page = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
          setShowHomePopup={setShowPopup}
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

      {/* Hello Popup */}
      {showPopup && selectedMarker && (
        <div className={`info-popup ${showPopup ? "show" : ""}`}>
          <div width="100%" className="big-container">
            <div overflow="auto" className="padding-container">
              <div className="infor-container">
              <div width="100%,50%,25%" id="#toilet-details-heading" class="building-card">
                <div display="flex" class="name-box">
                  <div font-weight="bold" font-size="3,4" class="name">
                    <span id="toilet-details-heading">NATIONAL GALLERY by cafe</span>
                  </div>
                </div>
                <div class="css-2j1fei"></div>
                <div class="css-2j1fei"></div>
                <a class="button " variant="primary" rel="noopener noreferrer" href="https://maps.apple.com/?dirflg=w&amp;daddr=51.508867663,-0.127614141">
                  <span class="icon">
                    <svg fill="currentColor" class="medium ">
                      <use href="/sprites/solid.svg#diamond-turn-right"></use>
                    </svg>
                  </span>
                  <span>Directions</span>
                </a>
                <div class="fresnel-container fresnel-greaterThanOrEqual-md ">
                <div class="css-1j8t7y0">
                </div>
                <div class="css-hee5t0">
                <div font-weight="bold" class="css-in3yi3">
                  <span>Is this information correct?</span>
                </div>
                <div class="css-1xauv4x"></div>
                  <div display="flex" class="css-3tftzz">
                    <button class="button " variant="primary" type="button"><span>Yes</span></button>
                          <div class="css-tobc9t"></div>
                          <div display="flex" class="css-3tftzz">No?<div class="css-1blv7rk"></div><a class="button button--secondary" variant="secondary" data-testid="edit-button" href="/loos/644a91db011d9a18db57e8ef/edit">
                          <span class="icon">
                            <svg fill="currentColor" class="small ">
                              <use href="/sprites/solid.svg#pen-to-square"></use>
                            </svg>
                          </span>
                          <span>Edit</span></a>
                          </div></div>
                          <div class="css-ex1l0e"></div>Last verified: <a href="/explorer/loos/644a91db011d9a18db57e8ef">19/05/2024, 04:50 PM</a>
              </div></div></div>


              <div width="100%,50%,25%" class="css-ig8tjk">
                <div font-weight="bold" class="css-in3yi3">
                  <span>Features</span>
                </div>
                <div class="css-1xauv4x">
                </div>
                <ul class="css-66iazq">
                  <div display="flex" class="css-m69v8h">
                    <div display="flex" class="css-3tftzz">
                      <div width="20px" display="flex" class="css-1hdpysa">
                        <span class="icon">
                          <svg fill="currentColor" class="medium ">
                            <use href="/sprites/solid.svg#person-dress"></use>
                          </svg>
                        </span>
                        </div>
                      </div>
                    <div class="css-1blv7rk">
                    </div>
                    Women
                    </div>
                    <div title="Available" class="css-hee5t0">
                      <span class="icon">
                      <svg fill="currentColor" class="medium " aria-label="Available">
                        <use href="/sprites/solid.svg#check"></use>
                      </svg>
                      </span>
                    </div>
                            
    
                  <li display="flex" class="css-m69v8h">
                    <div display="flex" class="css-3tftzz">
                    <div width="20px" display="flex" class="css-1hdpysa">
                      <span class="icon">
                        <svg fill="currentColor" class="medium ">
                          <use href="/sprites/solid.svg#person">
                          </use>
                        </svg>
                      </span>
                    </div>
                    <div class="css-1blv7rk">
                    </div>Men</div>
                    <div title="Available" class="css-hee5t0">
                      <span class="icon">
                        <svg fill="currentColor" class="medium " aria-label="Available">
                          <use href="/sprites/solid.svg#check"></use>
                        </svg>
                      </span>
                    </div>
                  </li>
                  <li display="flex" class="css-m69v8h">
                    <div display="flex" class="css-3tftzz">
                    <div width="20px" display="flex" class="css-1hdpysa">
                      <span class="icon">
                        <svg fill="currentColor" class="medium ">
                          <use href="/sprites/solid.svg#wheelchair-move">
                          </use>
                        </svg>
                      </span>
                    </div>
                    <div class="css-1blv7rk">
                    </div>Accessible</div>
                    <div title="Available" class="css-hee5t0">
                      <span class="icon">
                        <svg fill="currentColor" class="medium " aria-label="Available">
                          <use href="/sprites/solid.svg#check">
                          </use>
                        </svg>
                      </span>
                    </div>
                  </li>
                  <li display="flex" class="css-m69v8h">
                    <div display="flex" class="css-3tftzz">
                    <div width="20px" display="flex" class="css-1hdpysa">
                      <span class="icon"><svg fill="currentColor" class="medium ">
                        <use href="/sprites/solid.svg#key">
                        </use>
                      </svg>
                      </span>
                  </div>
                  RADAR Key
                  </div>
                  <div title="Unknown" color="tertiary" class="css-12c5yrj">
                    <span class="icon"><svg fill="currentColor" class="medium " aria-label="Unknown">
                      <use href="/sprites/solid.svg#question">
                      </use>
                    </svg>
                    </span>
                  </div>
                  </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  };
                  
export default H_ALog_Page;


