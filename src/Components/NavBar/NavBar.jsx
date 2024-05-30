import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSignInAlt,
  faUserPlus,
  faShop,
  faSearch,
  faPerson,
  faCartShopping,faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";

const Root = styled("div")({
  display: "flex",
  height: "100vh",
});

const Sidebar = styled(AppBar)({
  width: "60px",
  height: "100%",
  position: "fixed",
  right: 0,
  background: 'linear-gradient(0deg, rgba(0,124,134,1) 0%, rgba(0,64,140,1) 100%)',
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
  justifyContent: "space-between",
});


const Buttons = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "0px",
  marginBottom: "20px",
});

const BottomButtons = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "20px",
});

const NavBar = () => {
  return (
    <Root>
      <Sidebar>
        <Toolbar
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Buttons>
            <Button
              color="inherit"
              style={{ color: "white", marginBottom: "10px" }}
              size="large"
              onClick={() => (window.location.href = "/")}
            >
              <FontAwesomeIcon icon={faShop} />
            </Button>
            <Button
              color="inherit"
              style={{ color: "white", marginBottom: "10px" }}
              size="large"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            <Button
              color="inherit"
              style={{ color: "white", marginBottom: "10px" }}
              size="large"
              onClick={() => (window.location.href = "/profile")}
            >
              <FontAwesomeIcon icon={faAddressCard} />
            </Button>
            <Button
              color="inherit"
              style={{ color: "white", marginBottom: "10px" }}
              size="large"
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
            <Badge badgeContent={4} color="primary">
              <MailIcon color="action" />
            </Badge>
          </Buttons>
          <BottomButtons>
            <Button
              color="inherit"
              onClick={() => (window.location.href = "/login")}
              style={{ color: "white", marginBottom: "10px" }}
              size="large"
            >
              <FontAwesomeIcon icon={faSignInAlt} />
            </Button>
            <Button
              color="inherit"
              onClick={() => (window.location.href = "/register")}
              style={{ color: "white" }}
              size="large"
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </Button>
          </BottomButtons>
        </Toolbar>
      </Sidebar>
      
    </Root>
  );
};

export default NavBar;
