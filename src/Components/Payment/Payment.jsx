import React, { useState, useContext } from "react";
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
} from "@mui/material";
import { CartContext } from "../../contexts/CartContext";

const imgStyling = {
  width: "75px",
  height: "75px",
  marginRight: "12px",
};

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { cartItems, totalPrice } = useContext(CartContext);
  const userID = JSON.parse(localStorage.getItem("user")).id || 0;

  const createOrder = async (orderData) => {
    try {
      const res = await fetch("http://192.168.1.32:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      console.log("Order created successfully:", data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleCreateOrder = () => {
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
    createOrder(orderData);
  };

  const validateForm = () => {
    if (!cardNumber || !expiredDate || !cvv || !name) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleCreateOrder();
    console.log("Payment processed");
  };

  console.log(cartItems, `User ID : ${userID}`);
  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
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
                  />
                </ListItem>
                {index < cartItems.length - 1 && <Divider />}
              </div>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${totalPrice}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Payment Details
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <TextField
              label="Expired Date"
              fullWidth
              margin="normal"
              value={expiredDate}
              onChange={(e) => setExpiredDate(e.target.value)}
              required
            />
            <TextField
              label="CVV"
              fullWidth
              margin="normal"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            <TextField
              label="Name on Card"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Process Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Payment;
