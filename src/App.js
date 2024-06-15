import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Orders from './Components/Profile/Orders';
import Landingpage from './Components/Home/Landpingpage';
import LoginPage from './Components/Home/LoginPage';
import Register from './Components/Home/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Inbox from './Components/NavBar/Inbox';
import ProtectedPage from './Components/Home/ProtectedPage';
import { CartProvider } from "./contexts/CartContext";
import Products from './Components/Products/Products';
import Payment from './Components/Payment/Payment';
import NavBar from './Components/NavBar/NavBar';
import { OrderProvider } from './contexts/OrderContext';
import OrderDetail from './Components/Profile/OrderDetail';
import { UserProvider } from './contexts/UserContext';
import ProductDetail from './Components/Products/ProductDetails';
import { SelectedProductProvider } from './contexts/ProductDetailContext';

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
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <OrderProvider>

          <CartProvider>
            <SelectedProductProvider>

              <BrowserRouter>
                {/* <NavBar /> */}
                <Routes>
                  <Route path="/" element={<Landingpage />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<ProtectedPage />} />
                  <Route path="/products/:productID" element={<ProductDetail />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/payment" element={<Payment />} /> {/* Add the Payment route */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/orders/:orderID" element={<OrderDetail />} />
                </Routes>
              </BrowserRouter>
            </SelectedProductProvider>
          </CartProvider>
        </OrderProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
