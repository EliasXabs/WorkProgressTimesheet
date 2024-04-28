import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageContainer: {
    position: 'relative',
    backgroundColor: '#2C3E50',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    padding: '40px',
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
  },
  input: {
    width: '94%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    background: 'white',
    appearance: 'none',
  },
  button: {
    backgroundColor: '#17A2B8',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  nextButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#17A2B8',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '24px',
    textDecoration: 'none',
  },
};

function ModifyForm() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    position: '',
    teamLeader: 'no',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };

  const handleNextClick = () => {
    navigate('/admin'); // The URL should match your routing setup for the PickForm
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <select
            style={styles.select}
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Select Position</option>
            {/* Position options will be dynamically inserted here */}
          </select>
          <select
            style={styles.select}
            name="teamLeader"
            value={formData.teamLeader}
            onChange={handleChange}
          >
            <option value="">Team Leader</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <button 
            style={isButtonHovered ? { ...styles.button, backgroundColor: '#1DA1F2' } : styles.button}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            type="submit"
          >
            Modify Account
          </button>
        </form>
      </div>
      <button 
        style={styles.nextButton} 
        onClick={handleNextClick}
      >
        &#x3e; {/* Right arrow symbol */}
      </button>
    </div>
  );
}

export default ModifyForm;