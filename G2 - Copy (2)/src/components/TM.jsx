import PropTypes from "prop-types";
import "./ToiletModal.css";
import { First_test_building, commnents } from "../Damo_data/bindata";
import bin from "../assets/bin.png";
import organic from "../assets/organic.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import check from "../assets/check-mark-button.png";
import cross from "../assets/cross-mark.png";

const ToiletModal = ({ isOpen, onClose, toiletData, isLoggedIn }) => {
  if (!isOpen) return null;


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


          <h3 style={{  fontSize: '25px',
        
            marginBottom: '16px',
            color: '#1e1b4b',
            textAlign: 'center',
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


        {/* Container 2 - Features Section */}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          backgroundColor: '#FFFFFF',
          padding: window.innerWidth <= 768 ? '0px' : window.innerWidth <= 1024 ? '0px' : '0px',
          borderRadius: '4px',
          marginTop: '0',
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
        </div>

        {/* Container 3 - Empty for Future UI */}
        {/*<div style={{ flex: 1, height: '300px', backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '16px', width: '50%' }}></div>*/}

        {/*Comment section*/}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          padding: window.innerWidth <= 768 ? '0px' : window.innerWidth <= 1024 ? '0px' : '0px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '24px', color: '#1e1b4b'}}>2 Comments</h3>

        <div style = {{
          backgroundColor: '#D3ECFF',
          padding: '12px 16px',
          borderRadius: '16px',
          marginBottom: '10px',
          fontSize: '14px',
          lineHeight: '1.5',
          maxWidth: window.innerWidth <= 768 ? '100%' : '220px'
        }}>
          <p style={{margin:0, fontSize: '16px'}}>
            Wow this website is so good!
          </p>
        </div>
        <div style={{
          backgroundColor: '#D3ECFF',
          padding: '12px 16px',
          borderRadius: '16px',
          marginBottom: '10px',
          fontSize: '14px',
          lineHeight: '1.5',
          maxWidth: window.innerWidth <= 768 ? '100%' : '220px'
        }}>
          <p style ={{ margin:0, fontSize: '16px'}}>
            I love all the functions on this website!
          </p>
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
          <p style = {{ fontSize: '16px', fontWeight: 'bold', color: '#1e1b4b'}}>
            Please Login/Signup to comment!
          </p>
      </div>
    </div>
  </div>

    </div>
  );
}

