import React, { useState } from "react";
import { Badge, IconButton, Popover, Typography, Button } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const InboxPreview = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleNavigateToInbox = () => {
    navigate("/inbox");
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ padding: 0 }}>
        <Badge badgeContent={4} color="primary">
          <MailIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>You have 4 new messages.</Typography>
        <Button onClick={handleNavigateToInbox} sx={{ m: 2 }}>
          Go to Inbox
        </Button>
      </Popover>
    </div>
  );
};

export default InboxPreview;
