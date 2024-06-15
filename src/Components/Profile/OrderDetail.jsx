// src/components/OrderDetail/OrderDetail.js

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";
import { OrderContext } from "../../contexts/OrderContext";

const OrderDetail = () => {
  const { orderID } = useParams();
  const [order, setOrder] = useState(null);
  const { orders } = useContext(OrderContext);
  console.log(orderID, orders);
  useEffect(() => {
    const filteredOrder = orders.find(
      (order) => order.order_id === parseInt(orderID)
    );
    setOrder(filteredOrder);
  }, [orderID, orders]);

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Order Details</Typography>
          <Typography variant="body2">Status: {order.order_status}</Typography>
          <Typography variant="body2">
            Order Date: {order.order_date}
          </Typography>
          <Typography variant="body2">
            Transaction ID: {order.transaction_id}
          </Typography>
          <Typography variant="body2">
            Total Amount: ${order.total_amount}
          </Typography>
          <List>
            {order.items.map((item, index) => (
              <ListItem key={index}>
                {item.item_name} x ${item.quantity} ${item.item_price}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderDetail;
