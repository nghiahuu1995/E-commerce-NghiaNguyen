import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Badge, Popover, Typography, Box } from "@mui/material";
import pandaLogo from "../../assets/imgs/logos/panda.png";
import sadPandaLogo from "../../assets/imgs/logos/sadpanda.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faShop,
  faSearch,
  faCartShopping,
  faAddressCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const TopBar = styled(AppBar)({
  width: "100%",
  height: "48px",
  background:
    // "linear-gradient(0deg, rgba(0,124,134,1) 0%, rgba(0,64,140,1) 100%)",
    // "linear-gradient(0deg, rgba(0,64,140,1) 0%, rgba(0,64,140,1) 100%)",
    "linear-gradient(0deg, rgb(0,117,255) 0%, rgb(0,117,255) 100%)",
});

const Buttons = styled("div")({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
});
const IconStyling = {
  marginRight: "0px",
  marginLeft: "6px",
  fontWeight: "800",
};
const ButtonStyling = {
  color: "white",
  marginRight: "0px",
  marginLeft: "24px",
  fontSize: "1.2rem",

  "&:hover": {
    backgroundColor: "rgba(0,2,100,0.6)",
  },
};
const LogoutStyling = {
  color: "white",
  marginRight: "0px",
  marginLeft: "24px",
  fontSize: "1.2rem",

  "&:hover": {
    backgroundColor: "red",
  },
};
const NavBar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
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
    handleClose();
  };
  const handleSigout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Root>
      <TopBar
        position="static"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          style={{
            minHeight: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Buttons>
            <Button
              color="inherit"
              sx={ButtonStyling}
              size="medium"
              onClick={() =>
                isAuthenticated
                  ? (window.location.href = "/protected")
                  : (window.location.href = "/")
              }
            >
              {/* <FontAwesomeIcon icon={faShop} /> */}
              <img
                src={pandaLogo}
                alt=""
                style={{ width: "30px", marginRight: "0px" }}
              />
              <Typography
                sx={{
                  marginRight: "12px",
                  marginLeft: "12px",
                  fontWeight: "700",
                }}
              >
                Home
              </Typography>
            </Button>
            {isAuthenticated && (
              <Buttons style={{ display: "flex", justifyContent: "end" }}>
                <Button color="inherit" sx={ButtonStyling} size="small">
                  <FontAwesomeIcon icon={faSearch} />
                  <Typography sx={IconStyling}>Search</Typography>
                </Button>
                <Button
                  color="inherit"
                  sx={ButtonStyling}
                  size="small"
                  onClick={() => (window.location.href = "/profile")}
                >
                  <FontAwesomeIcon icon={faAddressCard} />
                  <Typography sx={IconStyling}>Profile</Typography>
                </Button>
                <Button color="inherit" sx={ButtonStyling} size="small">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Typography sx={IconStyling}>Cart</Typography>
                </Button>
                <Button onClick={handleClick} sx={ButtonStyling}>
                  <Badge badgeContent={4} color="primary">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      sx={{ color: "white" }}
                    />
                  </Badge>
                  <Typography sx={{ color: "white", marginLeft: "8px" }}>
                    Message
                  </Typography>
                </Button>
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
                  <Box sx={{ p: 2 }}>
                    <Typography>You have 4 new messages.</Typography>
                    <Button
                      onClick={handleNavigateToInbox}
                      sx={{ mt: 2 }}
                      variant="contained"
                      color="primary"
                    >
                      Go to Inbox
                    </Button>
                  </Box>
                </Popover>
              </Buttons>
            )}
          </Buttons>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isAuthenticated ? (
              // <Button
              //   color="inherit"
              //   onClick={handleSigout}
              //   style={ButtonStyling}
              //   size="small"
              //   onMouseEnter={() => setIsHovered(true)}
              //   onMouseLeave={() => setIsHovered(false)}
              // >
              //   <FontAwesomeIcon icon={faSignInAlt} />
              //   <Typography sx={IconStyling}>Log out</Typography>
              //   {isHovered ? (
              //     <img
              //       src={sadPandaLogo}
              //       alt=""
              //       style={{ width: "30px", marginLeft: "12px" }}
              //     />
              //   ) : (
              //     <img
              //       src={pandaLogo}
              //       alt=""
              //       style={{ width: "30px", marginLeft: "12px" }}
              //     />
              //   )}
              // </Button>
              <Button
                color="inherit"
                sx={LogoutStyling}
                size="small"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <Typography sx={IconStyling}>Log out</Typography>
                {isHovered ? (
                  <img
                    src={sadPandaLogo}
                    alt=""
                    style={{ width: "20px", marginLeft: "12px" }}
                  />
                ) : (
                  <img
                    src={pandaLogo}
                    alt=""
                    style={{ width: "20px", marginLeft: "12px" }}
                  />
                )}
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => (window.location.href = "/login")}
                  style={ButtonStyling}
                  size="small"
                >
                  <Typography>Sign In</Typography>
                  <FontAwesomeIcon icon={faSignInAlt} style={IconStyling} />
                </Button>
                {/* <Button
                  color="inherit"
                  onClick={() => (window.location.href = "/register")}
                  style={{ color: "white", fontSize: "1.2rem" }}
                  size="large"
                >
                  <Typography>Sign Up</Typography>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ marginLeft: "12px" }}
                  />
                </Button> */}
              </>
            )}
          </div>
        </Toolbar>
      </TopBar>
    </Root>
  );
};

export default NavBar;
