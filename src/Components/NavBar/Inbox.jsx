import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, text: "You have a new message from John Doe" },
  { id: 2, text: "Your order has been shipped" },
  { id: 3, text: "Reminder: Meeting at 3 PM" },
  { id: 4, text: "New comment on your post" },
];

const Inbox = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/protected");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Inbox
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={notification.text} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackClick}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default Inbox;
