import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageContainer: {
    position: 'relative',
    backgroundColor: '#2C3E50', // Background color taken from the photo provided
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
    width: '80%', // Adjusted based on the photo for a wider form
    maxWidth: '800px', // Maximum width of the form container
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Split into two columns
    gridGap: '1rem', // Space between grid items
    alignItems: 'start', // Align items to the start of each grid cell
  },
  input: {
    width: '100%',
    height: '40%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    gridColumn: '1 / -1', // Textarea spans both columns
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
    gridColumn: '1 / -1', // Button spans both columns
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

function CreateForm() {
  const [users, setUsers] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '',
    estTime: '',
    deadline: '',
    priorityLevel: '',
    assignee: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/user/getall'); // Adjust URL as needed
        setUsers(response.data); // Assuming the response body directly contains the array of users
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    const formattedDeadline = new Date(new Date(formData.deadline).getTime() + (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    console.log(formattedDeadline);

    // Construct the data object to send in the POST request
    const postData = {
      pid: 1, // hardcoded as per your requirement
      title: formData.taskTitle,
      description: formData.taskDescription,
      deadline: formattedDeadline,
      uid: parseInt(formData.assignee, 10),
      priority: formData.priorityLevel,
      tstatus: "To Do" // hardcoded status
  };

  console.log(typeof postData.uid, postData.uid);

  try {
      const response = await axios.post('http://localhost:8081/api/task/CreateTask', postData);
      if (response.status === 201) {
          console.log('Task created successfully:', response.data);
          // Redirect or perform additional actions upon success
          navigate('/admin'); // Example redirection after task creation
      } else {
          console.error('Failed to create task:', response);
          alert('Failed to create task');
      }
  } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
  }
  };

  const handleNextClick = () => {
    navigate('/admin'); // Replace with your next form's path
  };

  return (
    <div style={styles.pageContainer}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="taskTitle"
          value={formData.taskTitle}
          onChange={handleChange}
          placeholder="Task Title"
        />
        {/* <input
          style={styles.input}
          type="text"
          name="estTime"
          value={formData.estTime}
          onChange={handleChange}
          placeholder="EST. time"
        /> */}
        <textarea
          style={styles.textarea}
          name="taskDescription"
          value={formData.taskDescription}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <input
          style={styles.input}
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />
        <select
          style={styles.select}
          name="priorityLevel"
          value={formData.priorityLevel}
          onChange={handleChange}
        >
          <option value="" disabled hidden>Priority Level</option>
          {
            Array.from({ length: 9 }, (_, i) => i + 1).map(level => (
              <option key={level} value={level}>Level {level}</option>
            ))
          }
        </select>
        <select
          style={styles.select}
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
        >
          <option value="" disabled hidden>Assignee</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
          ))}
        </select>
        <button
          style={{ ...styles.button, backgroundColor: isHovered ? '#1DA1F2' : '#17A2B8' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="submit"
        >
          Create Task
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

export default CreateForm;