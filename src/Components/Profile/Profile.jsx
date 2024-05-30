import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Avatar, Button, Tabs, Tab, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import NavBar from '../NavBar/NavBar'; // Import the NavBar component

const Root = styled("div")({
  display: "flex",
  backgroundColor: 'rgb(207 223 255)',
});

const Content = styled(Box)(({ theme }) => ({
  marginTop: "0px",
  marginLeft: "0px", // Adjust margin to account for the fixed sidebar
  marginRight:"0px",
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh', // Ensure it takes up full height of the viewport
  padding: "20px", // Add some padding for better spacing
  [theme.breakpoints.down('md')]: {
    marginLeft: "0px", // Remove left margin for smaller screens
    padding: "10px", // Reduce padding for smaller screens
  },
}));

const ProfileCard = styled(Card)({
  width: '90%',
//      
  padding: '20px',
  textAlign: 'center',
  height: '640px',
});

const ProfileAvatar = styled(Avatar)({
  width: '100px',
  height: '100px',
  marginBottom: '20px',
});

const OrderTrackingCard = styled(Card)({
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  height: '640px',
});

const SummaryCard = styled(Card)({
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  marginTop: '20px',
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
          <div>{children}</div> {/* Changed <Typography> to <div> to avoid nested <p> */}
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
      <NavBar style={{ position: 'fixed', right: 0, top: 0, height: '100%' }} />
      <Content>
        <Grid container columnSpacing={8} rowSpacing={0}>
          <Grid item xs={12} md={6} lg={8}>
            <OrderTrackingCard>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Order Tracking
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Here you can track your orders and view the status of your recent purchases.
                </Typography>
              </CardContent>
            </OrderTrackingCard>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ProfileCard>
              <CardContent>
                <ProfileAvatar src="https://via.placeholder.com/100" alt="Profile Picture" />
                <Typography variant="h5" component="div">
                  Alex Johnson
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  alexjohnson@example.com
                </Typography>
                <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
                  <Tab label="Details" />
                  <Tab label="Settings" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Typography variant="body1" component="div">Location: Los Angeles, USA</Typography>
                  <Typography variant="body1" component="div">Joined: February 2023</Typography>
                  <Typography variant="body1" component="div">Bio: Developer and tech enthusiast.</Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Change Password
                  </Button>
                </TabPanel>
              </CardContent>
            </ProfileCard>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SummaryCard>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Here you can find a summary of your account activities, recent orders, and other important information.
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
