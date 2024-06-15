import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  CardContent,
  List,
  ListItem,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { OrderContext } from "../../contexts/OrderContext";
import {
  Root,
  Content,
  ProfileCard,
  ProfileAvatar,
  OrderTrackingCard,
  SummaryCard,
} from "./StyledComponents";
import TabPanel from "./TabPanel";
import { UserContext } from "../../contexts/UserContext";

const Orders = () => {
  const [value, setValue] = useState(0);
  const { orders, setOrders } = useContext(OrderContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { username, email } = user;
  console.log(user.id, orders);
  // useEffect(() => {
  //   async function fetchOrder() {
  //     try {
  //       const res = await fetch("http://localhost:3001/orders", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ user_id: user.id }),
  //       });
  //       const data = await res.json();
  //       console.log(`data`, data);

  //       setOrders(data);
  //       console.log(orders);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   fetchOrder();
  // }, [user, setOrders]);
  useEffect(() => {}, [orders]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOrderClick = async (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Root>
      <NavBar />
      <Content>
        <Grid
          container
          spacing={4}
          columnSpacing={8}
          sx={{ justifyContent: "center" }}
        >
          <Grid item xs={12} md={8}>
            <OrderTrackingCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Order Tracking
                </Typography>
                {orders.length > 0 ? (
                  orders.map((order, i) => (
                    <List
                      // button
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "4px",
                        marginBottom: "4px",
                        backgroundColor: "#eeeeee",
                        height: "160px",
                      }}
                      onClick={() => handleOrderClick(order.order_id)}
                    >
                      <ListItem sx={{ width: "40%", height: "60px" }}>
                        <img src="https://via.placeholder.com/150" alt="" />
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ margin: "0 24px" }}
                        >
                          Order# {order.order_id}
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Status: {order.order_status}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Total Amount: ${order.order_amount}
                        </Typography>
                      </ListItem>
                    </List>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No orders found.
                  </Typography>
                )}
                <Typography variant="body1" color="textSecondary">
                  Here you can track your orders and view the status of your
                  recent purchases.
                </Typography>
              </CardContent>
            </OrderTrackingCard>
          </Grid>
          <Grid item xs={12} md={2}>
            <ProfileCard>
              <CardContent>
                <ProfileAvatar
                  src="https://via.placeholder.com/100"
                  alt="Profile Picture"
                />
                <Typography variant="h5" component="div">
                  {username}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  {email}
                </Typography>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="profile tabs"
                  centered
                >
                  <Tab label="Details" />
                  <Tab label="Settings" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Typography variant="body1" component="div">
                    Location: Los Angeles, USA
                  </Typography>
                  <Typography variant="body1" component="div">
                    Joined: February 2023
                  </Typography>
                  <Typography variant="body1" component="div">
                    Bio: Developer and tech enthusiast.
                  </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                    onClick={() => {}}
                  >
                    Change Password
                  </Button> */}
                </TabPanel>
              </CardContent>
            </ProfileCard>
          </Grid>
          <Grid item xs={10}>
            <SummaryCard>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Here you can find a summary of your account activities, recent
                  orders, and other important information.
                </Typography>
              </CardContent>
            </SummaryCard>
          </Grid>
        </Grid>
      </Content>
    </Root>
  );
};

export default Orders;
