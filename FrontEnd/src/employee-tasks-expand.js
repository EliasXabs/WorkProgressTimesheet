import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClipboardList, faBell } from '@fortawesome/free-solid-svg-icons';
import { TimerContextTasks } from './TimerContextTasks';  // Import the context managing timers
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeTasksExpand = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const { taskId } = useParams(); // If you are passing the task ID as a URL parameter
  const [taskDetails, setTaskDetails] = useState(location.state?.task || {});

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        console.log(taskId)
        const response = await axios.get(`http://localhost:8081/api/task/getByTID/${taskId}`);
        setTaskDetails(response.data); // Assuming response.data contains task details
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    if (!taskDetails || Object.keys(taskDetails).length === 0) {
      fetchTaskDetails();
    }
  }, [taskId, taskDetails]);

  const { timers, startTimer, stopTimer } = useContext(TimerContextTasks);
  const task = location.state?.task || {};
  const timer = timers[task.id] || {};
  const elapsed = timer.totalTime || 0;

  // Event handlers for button clicks
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
      <div style={styles.taskDetails}>
        <div style={styles.taskCard}>
          <h2 style={styles.taskTitle}>{taskDetails.TaskTitle || 'Task Title'}</h2>
          <p style={styles.taskDescription}>{taskDetails.TaskDescription || 'Task description goes here...'}</p>
          <div style={styles.taskMetadata}>
            <div style={styles.taskMetadataItem}><strong>Due Date:</strong> <span>{taskDetails.Deadline || 'Date'}</span></div>
            <div style={styles.taskMetadataItem}><strong>Duration:</strong> <span>{taskDetails.duration || '1h'}</span></div>
          </div>
          <div style={styles.buttonGroup}>
            <button style={styles.controlButton} onClick={() => startTimer(task.TaskId)}>Start</button>
            <button style={styles.controlButton} onClick={() => stopTimer(task.TaskId)}>End</button>
          </div>
          <div>Elapsed Time: {Math.floor(elapsed / 1000)} seconds</div>
        </div>
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
  taskDetails: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px',
  },
  taskTitle: {
    color: '#333',
    fontSize: '24px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  taskDescription: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  taskMetadata: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  taskMetadataItem: {
    margin: '5px 0',
    fontSize: '16px',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between', // Add space between buttons
    marginBottom: '10px',
  },
  controlButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: '#00BCD4',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px', // Space between Start and End buttons
  }
};

export default EmployeeTasksExpand;
