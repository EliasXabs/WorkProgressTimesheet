import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClipboardList, faBell, faCheck, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';

const TaskPage = () => {
  let navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
          navigate('/login');
          return;
      }
      try {
          const response = await axios.get(`http://localhost:8081/api/task/getByID/${userId}`);
          setTasks(response.data);
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
    };
    fetchTasks();
  }, []);

  // Event handlers
  // Add your navigation logic here
  const handleHomeClick = () => navigate("/employee-dashboard");
  const handleCalendarClick = () => navigate("/employee-calendar");
  const handleClipboardClick = () => navigate("/employee-tasks");
  const handleBellClick = () => navigate("/employee-notifications");
  const toggleComplete = (taskId) => console.log(`Task ${taskId} completion toggled`);
  const handleExpandClick = (taskId) => {
    navigate(`/employee-tasks-expand/${taskId}`);
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
      <div style={styles.tasksContainer}>
        {tasks.map(task => (
          <div key={task.TaskID} style={styles.taskItem}>
            <div style={styles.taskContent}>
              <div style={styles.taskTitle}>{task.TaskTitle}</div>
              <div style={styles.taskDescription}>{task.TaskDescription}</div>
              <div style={styles.taskDate}>{task.Deadline}</div>
            </div>
            <div style={styles.taskDuration}>{task.duration}1</div>
            <FontAwesomeIcon icon={task.completed ? faCheck : farSquare} style={styles.taskIcon} />
            <button style={styles.expandButton} onClick={() => handleExpandClick(task.TaskID)}>Expand</button>
          </div>
        ))}
      </div>
    </div>
  );
};


const styles = {
  // Existing styles remain unchanged
  expandButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#00BCD4',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
    taskIcon: {
        color: 'black', 
        fontSize: '24px', 
        margin: '0 20px', 
      },
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
    tasksContainer: {
      flex: 1,
      overflowY: 'auto', 
      padding: '20px',
      backgroundColor: '#E5E5E5', 
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    },
    taskContent: {
      flex: 1,
    },
    taskTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px',
    },
    taskDescription: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '5px',
    },
    taskDate: {
      fontSize: '14px',
      color: '#666',
    },
    taskDuration: {
      fontSize: '16px',
      color: '#666',
      margin: '0 20px', 
    },
    checkButton: {
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
    }
  };
export default TaskPage;
