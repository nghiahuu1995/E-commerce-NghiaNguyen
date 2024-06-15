import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import { signupBG, TextFieldColor, InputText } from "./formStyling";
const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullname: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    fullname: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!formData.fullname) {
      newErrors.fullname = "Full Name is required";
      valid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
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
    <Container
      maxWidth="sm"
      sx={{
        ...signupBG,
        marginTop: "12px",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            sx={{ ...InputText, ...TextFieldColor }}
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
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            sx={{ ...InputText, ...TextFieldColor }}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            sx={{ ...InputText, ...TextFieldColor }}
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
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            sx={{ ...InputText, ...TextFieldColor }}
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="full-name"
            value={formData.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
          />
          <TextField
            sx={{ ...InputText, ...TextFieldColor }}
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            sx={{ ...InputText, ...TextFieldColor }}
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="signup"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="login"
            onClick={handleLogin}
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
