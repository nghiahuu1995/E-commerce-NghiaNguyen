import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

const Product = ({ product }) => {
  const { product_name, price, seller, description, image_url } = product;

  const handleAddToCart = () => {
    console.log(`Adding ${product_name} to cart`);
    // Add logic to handle adding the product to the cart
  };

  return (
    <Card
      sx={{
        width: 275,
        margin: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={image_url}
        alt={product_name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {product_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: ${price}
        </Typography>
        <Typography variant="body2">Seller: {seller}</Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Description: {description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          fullWidth
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default Product;
