import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    securityQuestion: "",
    answer: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async (e) => {
    // post method here
    e.preventDefault();
    try {
      const res = await fetch("http://192.168.1.32:3001/auth/register", {
        method: "POST",
        headers: "application/json",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Registration failed", data);
      else {
        console.log("User registered successfully", data);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching data");
    }
  };

  const navigateHome = () => {
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://192.168.1.32:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Registration failed", data);
      else {
        console.log("User registered successfully", data);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching data");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="securityAnswer"
            label="Answer"
            name="securityAnswer"
            autoComplete="security-answer"
            value={formData.securityanswer}
            onChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="signup"
            onClick={handleSubmit}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <Button
            onClick={navigateHome}
            sx={{
              backgroundColor: theme.palette.signup.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.signup.dark,
              },
              borderRadius: "50%",
              padding: "10px",
              minWidth: "auto",
            }}
          >
            <HomeIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
