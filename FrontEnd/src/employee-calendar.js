import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClipboardList, faBell } from '@fortawesome/free-solid-svg-icons';

const CalendarPage = () => {

  let navigate = useNavigate();

  // Function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Helper function to format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      weekday: 'long',
    });
  };

  // Initialize state to today and the following two days
  const [currentDateRange, setCurrentDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
  });

  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const { startDate, endDate } = currentDateRange;
      const userId = localStorage.getItem('userId');
  
      try {
        const response = await axios.get(`http://localhost:8081/api/task/three-day-window`, {
          headers: {
            'user-id': userId,  // Ensure this header name matches what your server expects
          },
          params: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
          }
        });
  
        const newTasks = response.data.reduce((acc, day) => {
          acc[day.date] = day.tasks.map(task => {
            console.log("Processing task with Deadline:", task.Deadline);

            const deadlineDate = task.Deadline ? new Date(task.Deadline) : new Date();

            return {
              ...task,
              dueDate: new Date(task.Deadline)  // Convert and debug
            };
          });
          return acc; // Make sure to return the accumulator
        }, {}); // Initialize the accumulator as an empty object
        
  
        setTasks(newTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    fetchTasks();
  }, [currentDateRange]);
  

  // Handler for previous arrow click
  const handlePrevClick = () => {
    setCurrentDateRange((prevRange) => {
      const newStart = addDays(prevRange.startDate, -3);
      return { startDate: newStart, endDate: addDays(newStart, 2) };
    });
  };

  // Handler for next arrow click
  const handleNextClick = () => {
    setCurrentDateRange((prevRange) => {
      const newStart = addDays(prevRange.endDate, 1);
      return { startDate: newStart, endDate: addDays(newStart, 2) };
    });
  };

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

  // TaskColumn component for displaying tasks for a given date
  const TaskColumn = ({ date }) => {
    const key = date.toISOString().split('T')[0];
    const tasksForDate = tasks[key] || [];
    return (
      <div style={styles.taskColumn}>
        <div style={styles.dayHeader}>{formatDate(date)}</div>
        {tasksForDate.map((task, index) => (
          <div key={index} style={styles.taskCard}>
            <div style={styles.taskName}>{task.TaskTitle}</div>
            <div style={styles.taskDueDate}>Due Date: {formatDate(new Date(task.dueDate))}</div>
            <div style={styles.taskDescription}>{task.TaskDescription}</div>
          </div>
        ))}
      </div>
    );
  };

  // Generate an array of dates for the TaskColumns
  const datesArray = Array.from({ length: 3 }, (_, i) => 
    addDays(currentDateRange.startDate, i)
  );

  // Calendar Navigator component with handlers
  const CalendarNavigator = () => (
    <div style={styles.navigatorContainer}>
      <button style={styles.navigatorButton} onClick={handlePrevClick}>{"<"}</button>
      <div style={styles.dateRange}>
        {`${formatDate(currentDateRange.startDate)} - ${formatDate(currentDateRange.endDate)}`}
      </div>
      <button style={styles.navigatorButton} onClick={handleNextClick}>{">"}</button>
    </div>
  );

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
      <CalendarNavigator />
      <div style={styles.columnsContainer}>
        {datesArray.map((date, index) => (
          <TaskColumn key={index} date={date} />
        ))}
      </div>
    </div>
  );
};

// Styles for the UI components
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
  navigatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#00BCD4',
  },
  navigatorButton: {
    cursor: 'pointer',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    border: 'none',
    margin: '0 10px',
  },
  dateRange: {
    color: '#FFFFFF',
    fontSize: '16px',
    margin: '0 10px',
  },
  columnsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
  taskColumn: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 10px',
    backgroundColor: '#00BCD4',
    borderRadius: '6px',
    width: '200px',
    padding: '10px',
  },
  dayHeader: {
    color: '#FFFFFF',
    marginBottom: '10px',
    fontSize: '18px',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    margin: '10px 0',
    padding: '10px',
  },
  taskName: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  taskDueDate: {
    fontSize: '14px',
    marginBottom: '4px',
  },
  taskDescription: {
    fontSize: '12px',
    marginBottom: '4px',
  },
};

export default CalendarPage;
