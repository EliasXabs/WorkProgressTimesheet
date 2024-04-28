import React, { useState } from 'react';
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

function ModifyTask() {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    taskTitle: '',
    publisher: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Implementation needed for actual task modification logic, possibly involving API calls
  };

  const handleNextClick = () => {
    navigate('/admin'); // Replace with your next form's path
  };

  return (
    <div style={styles.pageContainer}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <select
          style={styles.select}
          name="taskTitle"
          value={formData.taskTitle}
          onChange={handleChange}
        >
          <option value="">Task Title</option>
          {/* Task title options */}
        </select>
        <select
          style={styles.select}
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        >
          <option value="">Publisher</option>
          {/* Publisher options */}
        </select>
        <button
          style={{ ...styles.button, backgroundColor: isHovered ? '#1DA1F2' : '#17A2B8' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="submit"
        >
          Modify Task
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

export default ModifyTask;
