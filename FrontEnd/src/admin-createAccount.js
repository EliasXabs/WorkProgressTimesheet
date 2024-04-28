import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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

function AccountForm() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Email: '',
    Number: '',
    Role: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    
    const apiUrl = 'http://localhost:8081/api/auth/createuser';

    try {
      // Make a POST request to the backend with the formData
      const response = await axios.post(apiUrl, {
        Username: formData.Username,
        Password: formData.Password,
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        DateOfBirth: formData.DateOfBirth,
        Email: formData.Email,
        Number: formData.Number,
        Role: formData.Role
      });

      console.log('Success:', response.data);
      navigate('/admin');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
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
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            style={styles.input}
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            style={styles.input}
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            style={styles.input}
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            style={styles.input}
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            style={styles.input}
            type="tel"
            name="Number"
            value={formData.Number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            style={styles.input}
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
          />
          <select
            style={styles.select}
            name="position"
            value={formData.position} // Controlled by React state
            onChange={handleChange}
          >
            <option value="" disabled hidden>Position</option>
            <option value="Admin">Admin</option>
            <option value="TeamLeader">TeamLeader</option>
            <option value="User">User</option>
          </select>
          <button 
            style={isButtonHovered ? { ...styles.button, backgroundColor: '#1DA1F2' } : styles.button}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={handleSubmit}
            type="submit"
          >
            Add Account
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

export default AccountForm;