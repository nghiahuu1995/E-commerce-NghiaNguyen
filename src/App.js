import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Components/Home/Homepage';
import './App.css';
import ProfilePage from './Components/Profile/Profile';
import Landingpage from './Components/Home/Landpingpage';
import LoginPage from './Components/Home/LoginPage';
import Register from './Components/Home/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha, getContrastRatio } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const violetMain = '#8400ff'; // example violet color
const violetBase = '#5c00b3'; // example base violet color

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // lime
    },
    secondary: {
      main: '#800080', // purple
    },
    login: {
      main: '#4CAF50',

      contrastText: '#FFFFFF',
    },
    signup: {
      main: "#2196F3",
      contrastText: "#FFFFFF"
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
