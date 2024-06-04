import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import NavBar from "../NavBar/NavBar"; // Import the NavBar component

const Root = styled("div")({
  // display: "flex",
  // backgroundColor: "rgb(207 223 255)",
});

const Content = styled(Box)(({ theme }) => ({
  marginTop: "0px",
  marginLeft: "0px",
  marginRight: "0px",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  // alignItems: "center",
  minHeight: "100vh",
  padding: "20px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "0px",
    padding: "10px",
  },
}));

const ProfileCard = styled(Card)({
  width: "100%",
  padding: "20px",
  textAlign: "center",
  height: "640px",
});

const ProfileAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
});

const OrderTrackingCard = styled(Card)({
  width: "100%",
  padding: "20px",
  textAlign: "center",
  height: "640px",
});

const SummaryCard = styled(Card)({
  width: "100%",
  padding: "20px",
  textAlign: "center",
  marginTop: "20px",
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <Typography variant="h4" gutterBottom>
                  Order Tracking
                </Typography>
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
                  Alex Johnson
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  alexjohnson@example.com
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
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                  >
                    Change Password
                  </Button>
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

export default ProfilePage;
