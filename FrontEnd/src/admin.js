import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  adminPage: {
    backgroundColor: '#2C3E50',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '70px',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '150%',
    maxWidth: '800px',
    margin: '15px 0',
  },
  linkButton: (isHovered) => ({
    backgroundColor: isHovered ? '#1DA1F2' : '#17A2B8',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    width: '180px',
    height: '50px',
    padding: '0 10px',
    margin: '15px',
    transition: 'background-color 0.3s ease',
  }),
  logoutButton: (isHovered) => ({
    backgroundColor: isHovered ? '#FF6347' : '#E74C3C', 
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    width: '180px',
    height: '50px',
    padding: '0 10px',
    position: 'absolute', // Position the logout button absolutely
    top: '20px', // 20px from the top
    right: '20px', // 20px from the right
    transition: 'background-color 0.3s ease',
  })
};

function AdminPage() {
  const [hoverIndex, setHoverIndex] = useState(-1); // Track hover state for each button
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.adminPage}>
      <div style={styles.buttonGroup}>
        {["Create Account", "Edit Account", "Delete Account"].map((text, index) => (
          <button
            key={text}
            onClick={() => handleNavigation(`/${text.toLowerCase().replace(/ /g, '-')}`)}
            style={styles.linkButton(hoverIndex === index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            {text}
          </button>
        ))}
      </div>
      <div style={styles.buttonGroup}>
        {["Create Task", "Edit Task", "Delete Task"].map((text, index) => (
          <button
            key={text}
            onClick={() => handleNavigation(`/${text.toLowerCase().replace(/ /g, '-')}`)}
            style={styles.linkButton(hoverIndex === index + 3)} // Offset by 3 for next row
            onMouseEnter={() => setHoverIndex(index + 3)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            {text}
          </button>
        ))}
      </div>
      <div style={styles.buttonGroup}>
        {["Create Notification", "Edit Notification", "Delete Notification"].map((text, index) => (
          <button
            key={text}
            onClick={() => handleNavigation(`/${text.toLowerCase().replace(/ /g, '-')}`)}
            style={styles.linkButton(hoverIndex === index + 6)} // Offset by 6 for next row
            onMouseEnter={() => setHoverIndex(index + 6)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            {text}
          </button>
        ))}
      </div>
      <button
        onClick={() => handleNavigation('/')}
        style={styles.logoutButton(hoverIndex === 9)}
        onMouseEnter={() => setHoverIndex(9)}
        onMouseLeave={() => setHoverIndex(-1)}
      >
        Log Out
      </button>
    </div>
  );
}

export default AdminPage;
