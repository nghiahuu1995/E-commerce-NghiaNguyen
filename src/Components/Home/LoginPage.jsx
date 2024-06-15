import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { formBG, InputText, TextFieldColor } from "./formStyling";
const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // email: "",
    username: "",
    password: "",
    // securityQuestion: "",
  });
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data, data.user);
      if (!res.ok)
        throw new Error(data.message || "Login failed. Invalid Credentials");

      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      localStorage.setItem("user", JSON.stringify(decodedToken));
      console.log(decodedToken);
      const { id } = decodedToken;

      console.log(user);

      setUser(decodedToken);
      console.log(user);
      console.log("User logged in successfully", id);
      navigate("/products");
    } catch (err) {
      setError(err.message);
      console.log("Login error:", err.message);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        ...formBG,
        marginTop: "72px",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            sx={{ ...InputText, ...TextFieldColor }}
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
            sx={{ ...InputText, ...TextFieldColor }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
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
      </Box>
    </Container>
  );
};

export default LoginPage;
