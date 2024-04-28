import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClipboardList, faBell } from '@fortawesome/free-solid-svg-icons';
import TimerContext from './TimerContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { timer, isActive, isOnBreak, setIsOnBreak, setTimer, setIsActive } = useContext(TimerContext);
  const [notifications, setNotifications] = useState([]);
  const { resetTimerContext } = useContext(TimerContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8081/api/notification/getnoti/user/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, [navigate]);

  // Event handlers for button clicks
  const handleHomeClick = () => {
    navigate("/employee-dashboard");
  };

  const handleCalendarClick = () => {
    navigate("/employee-calendar");
  };

  const handleClipboardClick = () => {
    navigate("/employee-tasks");
  };

  const handleBellClick = () => {
    navigate("/employee-notifications");
  };

  const handleBreakClick = () => {
    setIsOnBreak(!isOnBreak);
  };

  const handleCheckOutClick = () => {
    localStorage.removeItem('userId');
    setIsActive(false);
    resetTimerContext(); 
    navigate("/");
  };

  // Converts total seconds into HH:MM:SS format
  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}h ${getMinutes}m ${getSeconds}s`;
  };

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
      <div style={styles.header}>
        <div style={styles.headerItem}>
          <span style={styles.headerTitle}>Weekly Hours</span>
          <span style={styles.headerValue}>99h 59m</span>
        </div>
        <div style={styles.headerItem}>
          <span style={styles.headerTitle}>Daily Hours</span>
          <span style={styles.headerValue}>{formatTime()}</span>
        </div>
        <div style={styles.headerItem}>
          <span style={styles.headerTitle}>Tasks Done</span>
          <span style={styles.headerValue}>999</span>
        </div>
      </div>
      <div style={styles.notificationsContainer}>
        <h2 style={styles.notificationsTitle}>Notifications</h2>
        {notifications.map(notification => (
          <div key={notification.notificationId} style={styles.notificationCard}>
            <h3 style={styles.notificationTitle}>
              {notification.taskName} - {notification.managerFirstName} {notification.managerLastName}
            </h3>
            <hr></hr>
            <p style={styles.notificationDescription}>{notification.description}</p>
          </div>
        ))}
      </div>
      <div style={styles.footer}>
        <button style={styles.breakButton} onClick={handleBreakClick}>
          {isOnBreak ? 'Resume' : 'Break'}
        </button>
        <button style={styles.checkOutButton} onClick={handleCheckOutClick}>
          Check Out
        </button>
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
    backgroundColor: '#FFFFFF',
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
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: '#00BCD4',
    color: '#FFFFFF',
  },
  headerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  headerValue: {
    fontSize: '24px',
  },
  notificationsContainer: {
    flex: 1, 
    backgroundColor: '#FFFFFF',
    padding: '10px 20px',
    margin: '20px 30px', 
    borderRadius: '8px',
    overflowY: 'auto' 
  },
  notificationsTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px'
  },
  notificationCard: {
    backgroundColor: '#ededed',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  notificationTitles: {
    fontSize: '16px',
    color: '#333'
  },
  notificationDescription: {
    fontSize: '14px',
    color: '#666'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: '#00BCD4',
    marginTop: 'auto' 
  },
  breakButton: {
    padding: '10px 20px',
    backgroundColor: '#FBC02D',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  checkOutButton: {
    padding: '10px 20px',
    backgroundColor: '#D32F2F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default DashboardPage;
