import React, { useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
const Register = () => {
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

  const handleLogin = () => {
    
    navigate('/login')
  };

  const handleSignUp = () => {
    // navigate(true);
    // post method here
  };

  

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
          Register
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="securityQuestion"
            label="Security Question"
            name="securityQuestion"
            autoComplete="security-question"
            value={formData.securityQuestion}
            onChange={handleChange}
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="signup"
            onClick={handleSignUp}
            sx={{ mt: 1, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            // type="submit"
            onClick={handleLogin}
            fullWidth
            variant="contained"
            color="login"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
