import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TimerContext from './TimerContext';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsActive } = useContext(TimerContext);

  const handleLogin = async (event) => {

    console.log("hello");
    event.preventDefault();
    setIsActive(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        Username: username,
        Password: password
      });

      console.log("trying to log in");

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        const userId = response.data.user.Id;
        localStorage.setItem('userId', userId);
        
        const userRole = response.data.user.Role;
        switch (userRole) {
          case 'Admin':
            window.location.href = '/admin';
            break;
          case 'User':
            window.location.href = '/employee-dashboard'; 
            break;
          case 'TeamLeader':
            window.location.href = '/teamleader-dashboard'; 
            break;
          default:
            window.location.href = '/';
        }
      } else {

        setErrorMessage('Unexpected error occurred.');
      }
    } catch (error) {
      if (error.response) {

        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            setErrorMessage('Invalid credentials. Please try again.');
            break;
          case 500:
            setErrorMessage('Server error. Please try later.');
            break;
          default:
            setErrorMessage('Unexpected error occurred.');
        }
      } else {

        console.error('Login error:', error.message);
        setErrorMessage('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MISCK</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {errorMessage && <div style={styles.error}>{errorMessage}</div>}
          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#E5E5E5',
  },
  card: {
    backgroundColor: '#00BCD4',
    paddingTop: '100px',
    paddingRight: '20px',
    paddingBottom: '100px',
    paddingLeft: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '300px',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
  },
  form: {
    margin: '100px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
  },
  button: {
    margin: '70px 0 0 0',
    padding: '10px',
    backgroundColor: '#00796B',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  }
};

export default LoginPage;