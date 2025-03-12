import PropTypes from "prop-types";
import "./ToiletModal.css";

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
            fontSize: window.innerWidth <= 768 ? '20px' : window.innerWidth <= 1024 ? '20px' : '24px',
            fontWeight: 'bold',
            color: '#1e1b4b',
            margin: window.innerWidth <= 768 ? '0 0 12px 0' : '2',
            whiteSpace: 'nowrap',
            marginLeft: window.innerWidth <= 768 ? '0' : window.innerWidth <= 1024 ? '-5px' : '-15px'
          }}>
            {toiletData.name || "Location Name"}
          </h2>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: '#a7f3d0',
            padding: '6px 12px',
            borderRadius: '16px',
            cursor: 'pointer',
            border: '2px solidrgb(10, 39, 66)',
            fontSize: '22px',
            fontWeight: '700',
            minHeight: '30px',
            minWidth: '120px',
            marginLeft: '-15px',
            marginTop: '10px',
            marginBottom: '10px',
            color: '#065666'
          }}>
            <span style={{ textDecoration: 'none' }}>xth floor</span>
          </button>

          <h3 style={{  fontSize: '20px', 
            marginBottom: '10px',
            color: '#1e1b4b',
            marginLeft: window.innerWidth <= 768 ? '0' : '-12px'
            }}>Is this information correct?</h3>

          <h4 style={{  fontSize: '15px', 
            marginBottom: '16px',
            color: '#1e1b4b',
            marginLeft: window.innerWidth <= 768 ? '0' : '-125px'
            }}>Please LogIn/SignUp to comment</h4>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <button style={{ 
              fontSize: '16px', 
              padding: '6px 24px', 
              backgroundColor: '#a7f3d0', 
              border: 'none', 
              borderRadius: '9999px', 
              cursor: 'pointer' 
            }}>Yes</button>
            <span style={{ 
              fontSize: '16px', 
              color: '#1e1b4b'
            }}>No?</span>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '8px',
              border: '2px solid #1e1b4b',
              borderRadius: '9999px',
              padding: '6px 16px',
              cursor: 'pointer'
            }}>
            <span style={{ 
              fontSize: '16px',
              color: '#1e1b4b'
            }}>Edit</span>
          </div>
        </div> */}

          {/* Moved Last Verified Below Yes/No/Edit Buttons */}
          {/* <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginTop: '10px',
            marginLeft: window.innerWidth <= 768 ? '0' : '-130px'
          }}>

          
            Last verified: <a href="#" style={{ color: '#1d4ed8', textDecoration: 'underline'}}>
              {toiletData.lastVerified || "18/12/2024, 08:05 PM"}
            </a>
          </p> */}
        </div>

        
        



        {/* Container 2 - Features Section */}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          backgroundColor: '#FFFFFF',
          padding: window.innerWidth <= 768 ? '16px' : window.innerWidth <= 1024 ? '6px' : '16px',
          borderRadius: '4px',
          marginTop: '-15px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          height: 'auto'
        }}>
        <h3 style={{ margin: '0 0 12 0', fontSize: '24px', fontWeight: 'bold'}}>Features</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}>
            <Feature icon="🗑️" label="General Waste" checked={toiletData.hasWomen} />
            <Feature icon="♻️" label="Recycle Waste" checked={toiletData.hasMen} />
            <Feature icon="🍃" label="Organic Waste" checked={toiletData.isAccessible} />
            <Feature icon="🚻" label="Hazardous Waste" checked={toiletData.isGenderNeutral} />
          </div>
        </div>

        {/* Container 3 - Empty for Future UI */}
        {/*<div style={{ flex: 1, height: '300px', backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '16px', width: '50%' }}></div>*/}

        {/*Comment section*/}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : window.innerWidth <= 1024 ? '1 0 150px' : '1 0 300px',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          padding: window.innerWidth <= 768 ? '16px' : window.innerWidth <= 1024 ? '6px' : '16px',
          width: window.innerWidth <= 768 ? '100%' : window.innerWidth <= 1024 ? '150px' : '300px',
          minHeight: window.innerWidth <= 768 ? 'auto' : window.innerWidth <= 1024 ? '250px' : '300px',
          marginTop: '-15px',
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
          
          
          
          {/*<p style = {{ fontSize: '16px', fontWeight: 'bold', color: '#1e1b4b'}}>
            Please Login/Signup to comment!
          </p>*/}
      </div>
    </div>
  </div>

  );
};

const Feature = ({ icon, label, checked }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
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
