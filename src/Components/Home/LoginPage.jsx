import React, { useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
const LoginPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    securityQuestion: '',
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login Data:', formData);
  };

  const handleSignUp = () => {
    // setNavigate(true);
    navigate('/register')
  };

const navigateHome = () => {
    navigate('/')
}

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="login"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Button
          color="signup"
            fullWidth
            variant="contained"
            onClick={handleSignUp}
            sx={{ mt: 1, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            onClick={navigateHome}
            sx={{ mt: 2 }}
          >
            <HomeIcon fontSize="large" />
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
