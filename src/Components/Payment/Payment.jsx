import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import { CartContext } from "../../contexts/CartContext";
import { OrderContext } from "../../contexts/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { TextFieldColor } from "../Home/formStyling";
const imgStyling = {
  width: "75px",
  height: "75px",
  marginRight: "12px",
};
const visaBG = {
  backgroundColor: "#1a237e",
  backgroundImage:
    "url('https://storage.googleapis.com/webapp-assets-images/ProductImages/bg.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "16px",
  color: "#fff",
  boxShadow: 3,
  p: 2,
};

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { orders, setOrders } = useContext(OrderContext);
  const { cartItems, setCartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("user")).id || 0;

  const createOrder = async (orderData) => {
    try {
      const res = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) {
        throw new Error("Payment processing failed");
      }
      const data = await res.json();
      console.log("Order placed successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const handleCreateOrder = async () => {
    const transactionID = Date.now();
    const orderData = {
      user_id: userID,
      transaction_id: transactionID,
      total_amount: totalPrice,
      status: "pending",
      items: cartItems,
      payment: {
        amount: totalPrice,
        currency: "USD",
        payment_method: "credit_card",
        status: "completed",
      },
    };
    console.log(orderData);
    return await createOrder(orderData);
  };

  const validateForm = () => {
    if (!cardNumber || !expiredDate || !cvv || !name) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const newOrder = await handleCreateOrder();
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setCartItems([]);
      navigate("/orders");
    } catch (error) {
      setError("Payment processing error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const navigateToCart = () => {
    navigate("/orders");
  };
  return (
    <Container maxWidth="md" sx={{ mt: 2, position: "relative" }}>
      <Button sx={{ marginBottom: "8px" }} onClick={navigateToCart}>
        <FontAwesomeIcon size="2x" icon={faArrowLeftLong}></FontAwesomeIcon>
      </Button>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: 3,
          mb: 2,
        }}
      >
        <CardContent sx={visaBG}>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Review Your Order
          </Typography>
          <List>
            {cartItems.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <img src={item.imageUrl} style={imgStyling} alt="" />
                  <ListItemText
                    primary={item.product}
                    secondary={`Quantity: ${item.quantity}, Price: $${item.price}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondaryTypographyProps={{ color: "grey.600" }}
                  />
                </ListItem>
                {index < cartItems.length - 1 && <Divider />}
              </div>
            ))}
          </List>
          <Typography
            variant="h6"
            sx={{ mt: 2, fontWeight: "bold", color: "#333" }}
          >
            Total: ${totalPrice}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={visaBG}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Payment Details
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Card Number"
                    fullWidth
                    margin="normal"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    variant="outlined"
                    sx={TextFieldColor}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expired Date"
                    fullWidth
                    margin="normal"
                    value={expiredDate}
                    sx={TextFieldColor}
                    onChange={(e) => setExpiredDate(e.target.value)}
                    required
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVV"
                    fullWidth
                    margin="normal"
                    value={cvv}
                    sx={TextFieldColor}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name on Card"
                    fullWidth
                    margin="normal"
                    value={name}
                    sx={TextFieldColor}
                    onChange={(e) => setName(e.target.value)}
                    required
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#fff" } }}
                    InputProps={{ style: { color: "#fff" } }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#ffab00",
                  color: "#1a237e",
                  fontWeight: "bold",
                }}
                disabled={loading}
              >
                Process Payment
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Payment;
