import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageContainer: {
    backgroundColor: '#2C3E50',
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
    width: '50%',
    maxWidth: '500px',
    display: 'grid',
    gridGap: '1rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    gridColumn: '1 / -1', // Make the textarea span across all columns
    height: '5rem',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'none',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    background: 'white',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    appearance: 'none',
  },
  button: {
    gridColumn: '1 / -1', // Make the button span across all columns
    backgroundColor: '#17A2B8',
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

function PostNotification() {
  const [tasks, setTasks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    TaskID: '',
    Description: ''
  });
  const navigate = useNavigate();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Correct the form state update based on the actual input names
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    
    const notificationData = {
      TaskID: formData.TaskID,
      Description: formData.Description
  };

  try {
      const response = await axios.post('http://localhost:8081/api/notification/addnoti', notificationData);
      if (response.status === 200 || response.status === 201) {
          alert('Notification posted successfully');
          navigate('/admin'); // Navigate to the admin or confirmation page after successful posting
      } else {
          console.error('Failed to post notification:', response);
          alert('Failed to post notification');
      }
  } catch (error) {
      console.error('Error posting notification:', error);
      alert('Error posting notification');
  }
  };

  const handleNextClick = () => {
    navigate('/admin'); // You should replace '/next' with the actual route you want to navigate to after posting the notification
  };

  return (
    <div style={styles.pageContainer}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>

      <select
        style={styles.select}
        name="TaskID"  // Make sure this matches the state key
        value={formData.TaskID}
        onChange={handleChange}
      >
        <option value="" disabled hidden>Select Task</option>
        {tasks.map((task) => (
          <option key={task.TaskID} value={task.TaskID}>{task.TaskID} - {task.TaskTitle}</option>
        ))}
      </select>
      <textarea
        style={styles.textarea}
        name="Description"  // Make sure this matches the state key
        value={formData.Description}
        onChange={handleChange}
        placeholder="Notification Description"
      />
        <button
          style={{ ...styles.button, backgroundColor: isHovered ? '#1DA1F2' : '#17A2B8' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="submit"
        >
          Post Notification
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

export default PostNotification;
