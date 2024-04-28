import React, { useState } from 'react';
import axios from 'axios';
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
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: (isHovered) => ({
    backgroundColor: isHovered ? '#E74C3C' : '#FF6347', // Lighter red on hover
    color: 'white',
    padding: '15px 30px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  }),
  nextButton: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    backgroundColor: '#17A2B8',
    color: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
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

function Delete() {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({ Username: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    console.log(formData.Username);

    // API endpoint URL
    const apiUrl = `http://localhost:8081/api/user/delete/${formData.Username}`;
    try {
        const response = await axios.delete(apiUrl);
        if (response.status === 200) {
            alert('User deleted successfully');
            // Optionally redirect or update UI here
            navigate('/admin'); // redirect to home or any other page
        } else {
            alert('Failed to delete the user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
    }
  };

  const handleNextClick = () => {
    navigate('/admin'); // Ensure this path matches your route configurations
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            placeholder="Username"
          />
          <button
            style={styles.button(isHovered)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type="submit"
          >
            Delete Account
          </button>
        </form>
      </div>
      <button
        type="button"
        style={styles.nextButton}
        onClick={handleNextClick}
      >
        &#x3e;
      </button>
    </div>
  );
}

export default Delete;
