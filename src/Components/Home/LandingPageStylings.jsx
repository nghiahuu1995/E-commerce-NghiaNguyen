import { styled } from "@mui/system";
import {
  AppBar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

export const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const Header = styled(AppBar)({
  marginBottom: "20px",
});

export const HeroSection = styled(Box)({
  backgroundColor: "#f0f0f0",
  background:
    "radial-gradient(circle, rgba(0,124,134,1) 0%, rgba(0,64,140,1) 100%)",
  color: "#ffffff",
  padding: "40px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  height: "70vh",
});

export const ContentSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
});

export const ProductPreview = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "20px",
  width: "80%",
  maxWidth: "1200px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
  transition: "transform 0.5s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export const ProductDetails = styled(CardContent)({
  flex: "1",
  padding: "20px",
});

export const ProductImage = styled(CardMedia)({
  width: "50%",
  paddingRight: "20px",
  transition: "transform 0.5s ease-in-out",
});

export const ArrowButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    backgroundColor: "#1976d2",
    color: "#ffffff",
  },
  zIndex: 1,
});

export const FooterSection = styled(Box)({
  backgroundColor: "#2c2c2c",
  color: "#ffffff",
  padding: "20px",
  textAlign: "center",
});

export const PriceTag = styled(Typography)({
  fontFamily: "Roboto, sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
  padding: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
});
