import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageContainer: {
    backgroundColor: '#2C3E50', // Assuming the same background color as the CreateForm page
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '2rem',
    backgroundColor: 'white',
    width: '50%', // Adjust width as needed
    maxWidth: '500px', // Maximum width of the form container
    display: 'grid',
    gridGap: '1rem',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    background: 'white',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    appearance: 'none',
  },
  button: {
    backgroundColor:'#FF6347',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  nextButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#17A2B8',
    color: 'white',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '24px',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
  },
};

function DeleteTask() {
  const [tasks, setTasks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    taskid: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ taskid: event.target.value });
  };

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/task/GetAllTask');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };
    fetchTasks();
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    
    if (!formData.taskid) {
      alert('Please select a task to delete.');
      return;
    }
    try {
        const response = await axios.delete(`http://localhost:8081/api/task/DeleteTask/${formData.taskid}`);
        if (response.status === 200 || response.status === 204) {
            alert('Task deleted successfully');
            navigate('/admin'); // or refresh tasks
        } else {
            alert('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task');
    }
  };

  const handleNextClick = () => {
    navigate('/admin'); // Replace with your next form's path
  };

  return (
    <div style={styles.pageContainer}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
      <select
        style={styles.select}
        name="taskid"
        value={formData.taskid}
        onChange={handleChange}
    >
        <option value="" disabled hidden>Select a Task</option>
        {tasks.map((task) => (
            <option key={task.TaskID} value={task.TaskID}>{task.TaskID} - {task.TaskTitle}</option>
        ))}
      </select>
        <button
          style={{ ...styles.button, backgroundColor: isHovered ? '#E74C3C' : '#FF6347' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="submit"
        >
          Delete Task
        </button>
      </form>
      <button
        style={styles.nextButton}
        onClick={handleNextClick}
      >
        &#x3e;
      </button>
    </div>
  );
}

export default DeleteTask;
