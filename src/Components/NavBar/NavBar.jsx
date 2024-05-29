import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons"; // Icon for logo
import { faShoppingCart,faSignInAlt, faUserPlus,faShop } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";

const Root = styled("div")({
    flexGrow: 1,
});

const MenuButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const Title = styled(Typography)({
    flexGrow: 1,
});

const Logo = styled("img")({
    marginRight: "auto",
    cursor: "pointer",
});

const Buttons = styled("div")({
    marginLeft: "auto",
});

export default function NavBar() {
    return (
        <Root>
            <AppBar position="static">
                <Toolbar>
                    <MenuButton edge="start" color="inherit" aria-label="menu">
                    <FontAwesomeIcon icon={faShop} />
                    </MenuButton>
                    {/* <Logo icon={faCar} onClick={() => window.location.href = '/'} /> */}
                    
                    <Title variant="h6">E-commerce Site</Title>
                    <Buttons>
                        <Button
                            color="inherit"
                            onClick={() => (window.location.href = "/login")}
                        >
                            <FontAwesomeIcon icon={faSignInAlt} />
                            &nbsp; Log In
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => (window.location.href = "/register")}
                        >

                            <FontAwesomeIcon icon={faUserPlus} />
                            &nbsp; Sign Up {faShop}
                        </Button>
                    </Buttons>
                </Toolbar>
            </AppBar>
        </Root>
    );
}
