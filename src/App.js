import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import ProfilePage from './Components/Profile/Profile';
import Landingpage from './Components/Home/Landpingpage';
import LoginPage from './Components/Home/LoginPage';
import Register from './Components/Home/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Inbox from './Components/NavBar/Inbox';
import ProtectedPage from './Components/Home/ProtectedPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009c34', // lime
    },
    secondary: {
      main: '#800080', // purple
    },
    login: {
      main: '#4CAF50',
      dark: "#357a37",
      contrastText: '#FFFFFF',
    },
    signup: {
      main: "#2196F3",
      contrastText: "#FFFFFF",
      dark: "#1769AA"
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
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
