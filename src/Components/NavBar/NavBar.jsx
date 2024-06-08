import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import {
  AppBar,
  Toolbar,
  Button,
  Badge,
  Popover,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faCartShopping,
  faAddressCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import pandaLogo from "../../assets/imgs/logos/panda.png";
import sadPandaLogo from "../../assets/imgs/logos/sadpanda.png";
import Search from "./Search";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const TopBar = styled(AppBar)({
  width: "100%",
  height: "48px",
  position: "fixed",
  zIndex: "1000",
  background: "linear-gradient(0deg, rgb(0,117,255) 0%, rgb(0,117,255) 100%)",
});

const Buttons = styled("div")({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center",
});

const IconStyling = {
  marginRight: "0px",
  marginLeft: "6px",
  fontWeight: "800",
};

const ButtonStyling = {
  color: "white",
  marginRight: "0px",
  marginLeft: "0px",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "rgba(0,2,100,0.6)",
  },
};

const LogoutStyling = {
  color: "white",
  marginRight: "0px",
  marginLeft: "2px",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "red",
  },
};

const NavBar = ({ searchHandler }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const { cartItems, setCartItems, totalPrice } = useContext(CartContext);

  // const totalPrice = cartItems
  //   .reduce((acc, item) => parseFloat(item.price * item.quantity) + acc, 0)
  //   .toFixed(2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const cartOpen = Boolean(cartAnchorEl);
  const id = open ? "simple-popover" : undefined;
  const cartId = cartOpen ? "cart-popover" : undefined;

  const handleNavigateToInbox = () => {
    navigate("/inbox");
    handleClose();
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckOut = () => {
    navigate("/payment");
    handleCartClose();
  };

  return (
    <Root>
      <TopBar
        position="fixed"
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
                  ? (window.location.href = "/products")
                  : (window.location.href = "/")
              }
            >
              {/* <img
                src={pandaLogo}
                alt=""
                style={{ width: "30px", marginRight: "0px" }}
              /> */}
              <Typography
                sx={{
                  marginRight: "6px",
                  marginLeft: "6px",
                  fontWeight: "700",
                }}
              >
                Home
              </Typography>
            </Button>
            {isAuthenticated && (
              <Buttons style={{ display: "flex", justifyContent: "end" }}>
                <Search searchHandler={searchHandler} />
                <Button
                  color="inherit"
                  sx={ButtonStyling}
                  size="small"
                  onClick={() => (window.location.href = "/profile")}
                >
                  <FontAwesomeIcon icon={faAddressCard} />
                  <Typography sx={IconStyling}>Profile</Typography>
                </Button>
                <Button
                  color="inherit"
                  sx={ButtonStyling}
                  size="small"
                  onClick={handleCartClick}
                >
                  <Badge badgeContent={cartItems.length} color="success">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Badge>
                  <Typography sx={IconStyling}>Cart</Typography>
                </Button>
                <Popover
                  id={cartId}
                  open={cartOpen}
                  anchorEl={cartAnchorEl}
                  onClose={handleCartClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ p: 2, minWidth: "200px", maxWidth: "100%" }}>
                    <Typography variant="h6">Cart</Typography>
                    <List sx={{ margin: "0px" }}>
                      {cartItems.map((item, index) => (
                        <div key={index}>
                          <ListItem
                            sx={{
                              marginTop: "02px",
                              marginBottom: "02px",
                              backgroundColor: "#fffbca",
                              height: "120px",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "240px",
                              }}
                            >
                              <img
                                src={item.imageUrl}
                                alt=""
                                width="40%"
                                height="100%"
                                style={{ marginRight: "10px" }}
                              />
                              <List sx={{ width: "100%" }}>
                                <ListItemText
                                  primary={item.product}
                                  secondary={`price: $${item.price}`}
                                  sx={{ marginRight: "4px" }}
                                />
                                <ListItemText
                                  secondary={`Quantity: ${item.quantity}`}
                                  sx={{ marginRight: "4px" }}
                                />
                                <ListItemText
                                  secondary={`$${(
                                    item.quantity * item.price
                                  ).toFixed(2)}`}
                                  sx={{ marginRight: "4px" }}
                                />
                              </List>
                            </Box>
                            <Button
                              sx={{ alignSelf: "flex-end" }}
                              size="small"
                              variant="contained"
                              color="error"
                              startIcon={<Delete />}
                              onClick={() => handleDeleteFromCart(item.id)}
                            >
                              Delete
                            </Button>
                          </ListItem>
                          {index < cartItems.length - 1 && <Divider />}
                        </div>
                      ))}
                    </List>
                    {cartItems.length < 1 && (
                      <Typography variant="body2">No items in cart</Typography>
                    )}
                    <Typography variant="body1">
                      Total: ${totalPrice}
                    </Typography>
                    <Button
                      onClick={handleCheckOut}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Check out
                    </Button>
                  </Box>
                </Popover>
                <Button onClick={handleClick} sx={ButtonStyling}>
                  <Badge badgeContent={4} color="primary">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      sx={{ color: "white" }}
                    />
                  </Badge>
                  <Typography sx={{ color: "white", marginLeft: "4px" }}>
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
              <Button
                color="inherit"
                sx={LogoutStyling}
                size="small"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleSignout}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <Typography sx={IconStyling}>Log out</Typography>
                {isHovered ? (
                  <img
                    src={sadPandaLogo}
                    alt=""
                    style={{ width: "20px", marginLeft: "6px" }}
                  />
                ) : (
                  <img
                    src={pandaLogo}
                    alt=""
                    style={{ width: "20px", marginLeft: "6px" }}
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
              </>
            )}
          </div>
        </Toolbar>
      </TopBar>
    </Root>
  );
};

export default NavBar;
