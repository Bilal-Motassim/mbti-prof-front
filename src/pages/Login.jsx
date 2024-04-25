import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8888/api/prof/login', {
        email,
        password,
      });
      const { token, prof } = response.data.result;
  
      // Store the token and prof credentials in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('prof', JSON.stringify(prof));
  
      // Redirect to profile page or any other protected route
      history.push('/profile');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLoginError('Invalid credentials');
      } else {
        alert('Connected');
      }
    }
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom>
        LOGIN
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mt={2}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth mt={2}>
          Login
        </Button>
        {loginError && (
          <Typography variant="body2" color="error" mt={2}>
            {loginError}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default Login;
