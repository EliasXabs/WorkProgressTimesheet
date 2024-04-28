import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClipboardList, faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationPage = () => {
    let navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      const fetchNotifications = async () => {
          const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in localStorage
          if (!userId) {
              navigate('/login');
              return;
          }
          try {
              const response = await axios.get(`http://localhost:8081/api/notification/getnoti/user/${userId}`);
              setNotifications(response.data);
          } catch (error) {
              console.error('Error fetching notifications:', error);
          }
      };

      fetchNotifications();
  }, [navigate]);

    // Event handlers
    const handleHomeClick = () => navigate("/employee-dashboard");
    const handleCalendarClick = () => navigate("/employee-calendar");
    const handleClipboardClick = () => navigate("/employee-tasks");
    const handleBellClick = () => navigate("/employee-notifications");

    return (
        <div style={styles.container}>
        <div style={styles.topBar}>
          <button style={{ ...styles.topBarItem, ...styles.button }} onClick={handleHomeClick}>
            <FontAwesomeIcon icon={faHome} style={styles.icon} />
          </button>
          <button style={{ ...styles.topBarItem, ...styles.button }} onClick={handleCalendarClick}>
            <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
          </button>
          <button style={{ ...styles.topBarItem, ...styles.button }} onClick={handleClipboardClick}>
            <FontAwesomeIcon icon={faClipboardList} style={styles.icon} />
          </button>
          <button style={{ ...styles.topBarItem, ...styles.button }} onClick={handleBellClick}>
            <FontAwesomeIcon icon={faBell} style={styles.icon} />
          </button>
        </div>
        <div style={styles.notificationsContainer}>
        {notifications.map(notification => (
                    <div key={notification.notificationId} style={styles.notificationItem}>
                        <div style={styles.notificationTitle}>{notification.taskName}</div>
                        <div style={styles.notificationSender}>{notification.managerFirstName} {notification.managerLastName}</div>
                        <div style={styles.notificationMessage}>{notification.description}</div>
                    </div>
                ))}
        </div>
      </div>
    );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#E5E5E5',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        backgroundColor: '#00BCD4',
      },
    topBarItem: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20px',
        height: '32px',
        backgroundColor: '#00BCD4',
        borderRadius: '50%',
        margin: '20px',
        border: 'none',
      },
      button: {
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
        backgroundColor: '#00BCD4',
        border: 'none',
      },
      icon: {
        fontSize: '24px',
        color: 'white',
      },
    
    notificationsContainer: {
      flex: 1,
      padding: '20px', 
      overflowY: 'auto', 
    },
    notificationItem: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '15px', 
      marginBottom: '10px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
      borderLeft: '5px solid #34A853',
      position: 'relative',
    },
    notificationTitle: {
      color: '#34A853', 
      fontWeight: 'bold',
      fontSize: '16px', 
      marginBottom: '0.5rem', 
    },
    notificationSender: {
      color: '#000',
      fontSize: '14px', 
      marginBottom: '0.5rem',
    },
    notificationMessage: {
      color: '#555', 
      fontSize: '14px', 
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2, 
      WebkitBoxOrient: 'vertical',
    },
  };

export default NotificationPage;
