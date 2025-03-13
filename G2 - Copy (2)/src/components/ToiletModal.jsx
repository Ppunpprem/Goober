import PropTypes from "prop-types";
import "./ToiletModal.css";
import { First_test_building, commnents } from "../Damo_data/bindata";
import bin from "../assets/bin.png";
import organic from "../assets/organic.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";

const ToiletModal = ({ isOpen, onClose, toiletData, isLoggedIn }) => {
  if (!isOpen) return null;

  // Base styles with responsive adjustments
  const modalStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: window.innerWidth <= 768 ? '16px' : window.innerWidth <= 1024 ? '16px' : '24px',
    zIndex: 1000,
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: window.innerWidth <= 768 ? '12px' : '16px',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  return (
    <div style={modalStyle}>
      <div style={{ position: 'relative' }}>
        <button onClick={onClose} style={{ 
          position: 'absolute',
          right: '8px',
          top: '8px',
          background: '#fee2e2',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: '#ef4444',
          transition: 'all 0.2s ease',
        }}>
          ✕
        </button>
      </div>
      

      {/* Responsive Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        gap: window.innerWidth <= 768 ? '16px' : window.innerWidth <= 1024 ? '8px' : '24px',
        width: '100%',
        maxHeight: window.innerWidth <= 768 ? '80vh' : window.innerWidth <= 1024 ? '85vh' : '85vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        msOverflowStyle: 'none',
        paddingBottom: window.innerWidth <= 768 ? '16px' : '16px',
        paddingTop: window.innerWidth <= 768 ? '16px' : '0',
        '::-webkit-scrollbar': {
          width: window.innerWidth <= 768 ? '4px' : '0',
          height: window.innerWidth <= 768 ? '0' : '6px'
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1'
        },
        '::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '3px'
        }
      }}>

        {/* Container 1 - Location, Directions, and Confirmation */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: window.innerWidth <= 768 ? '16px' : window.innerWidth <= 1024 ? '6px' : '16px',
          borderRadius: window.innerWidth <= 768 ? '12px' : '4px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          flex: window.innerWidth <= 768 ? '1 1 auto' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          boxShadow: window.innerWidth <= 768 ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          height: 'auto'
        }}>
          <h2 style={{
            fontSize: window.innerWidth <= 768 ? '30px' : window.innerWidth <= 1024 ? '30px' : '34px',
            fontWeight: 'bold',
            color: '#1e1b4b',
            margin: window.innerWidth <= 768 ? '0 0 12px 0' : '2',
            padding: '0px 10px 0px 10px',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            marginLeft: window.innerWidth <= 768 ? '0' : window.innerWidth <= 1024 ? '-5px' : '-15px'
          }}>
            {First_test_building.building_name}
          </h2>

          <h8 className='floor-container'>{First_test_building.floor_number}th Floor</h8>


          <h3 style={{  fontSize: '23px',
            marginBottom: '16px',
            color: '#1e1b4b',
            textAlign: 'left',
            marginLeft: window.innerWidth <= 768 ? '0' : '0px'
            }}>Is this information correct?
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <button className="button-yes-container" 
            >Yes</button>

            <button className="button-no-container">
              No
            </button>

            
            <div style={{ 
              
            }}>
            
          </div>
        </div> 

          
        </div>

        
        



        {/* Container 2 - Features Section */}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          backgroundColor: '#FFFFFF',
          padding: window.innerWidth <= 768 ? '0px' : window.innerWidth <= 1024 ? '0px' : '0px',
          borderRadius: '4px',
          marginTop: '-15px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          height: 'auto'
        }}>
        <h3 className='feature-container'>
          Features
        </h3>
          <div className='bin-container' style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: '100%'
          }}>
            <Feature icon={<img src={bin} alt="General Waste" style={{ width: "24px", height: "24px" }} />} label="General Waste" checked={toiletData.hasWomen} />
            <Feature icon={<img src={recycle} alt="Recycle Waste" style={{ width: "24px", height: "24px" }} />} label="Recycle Waste" checked={toiletData.hasMen} />
            <Feature icon={<img src={organic} alt="Organic Waste" style={{ width: "24px", height: "24px" }} />} label="Organic Waste" checked={toiletData.isAccessible} />
            <Feature icon={<img src={hazard} alt="Hazardous Waste" style={{ width: "24px", height: "24px" }} />} label="Hazardous Waste" checked={toiletData.isGenderNeutral} />
          </div>
        </div>

        {/* Container 3 - Empty for Future UI */}
        {/*<div style={{ flex: 1, height: '300px', backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '16px', width: '50%' }}></div>*/}

        {/*Comment section*/}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          
          borderRadius: '4px',
          padding: window.innerWidth <= 768 ? '0px' : window.innerWidth <= 1024 ? '0px' : '0px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          marginTop: '-15px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
  
        <div style = {{
        }}>
         
        </div>
        <div style={{
 
          padding: '0px',
          textAlign: 'left',
          borderRadius: '16px',
     
    
  
        }}>

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
      </div>

        {/* Container 4 - Empty for Future UI */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: window.innerWidth <= 768 ? '16px' : window.innerWidth <= 1024 ? '6px' : '16px',
          borderRadius: window.innerWidth <= 768 ? '12px' : '4px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          flex: window.innerWidth <= 768 ? '1 1 auto' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          boxShadow: window.innerWidth <= 768 ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <p style = {{ fontSize: '20px', fontWeight: 'bold', color: '#17005a'}}>
            Please Login/Signup to comment!
          </p>
      </div>
    </div>
  </div>

  );
};

const Feature = ({ icon, label, checked }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
    <span style={{ marginRight: '12px', width: '24px', fontSize: '20px' }}>{icon}</span>
    <span>{label}</span>
    {checked ? (
      <span style={{ marginLeft: 'auto', color: '#10b981', fontSize: '20px' }}>✓</span>
    ) : checked === false ? (
      <span style={{ marginLeft: 'auto', color: '#ef4444', fontSize: '20px' }}>✕</span>
    ) : (
      <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '20px' }}>?</span>
    )}
  </div>
);

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

ToiletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  toiletData: PropTypes.object.isRequired,
};

export default ToiletModal;
