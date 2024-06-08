import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
} from "@mui/material";

const productNameStyling = {
  fontWeight: "800",
};

const Product = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const {
    product_name,
    price,
    seller,
    description,
    image_url,
    rating,
    stock,
    id,
  } = product;

  const quantityHandler = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: 250, lg: 275 },
        // margin: { xs: 1, sm: 0 },
        marginBottom: "6px",
        marginTop: "6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: { xs: "auto", sm: 400 },
        maxHeight: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="160px"
        // maxHeight="100%"
        image={image_url}
        alt={product_name}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Typography variant="h5" component="div" sx={productNameStyling}>
          {product_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: ${price}
        </Typography>
        <Typography variant="body2">🏪 Seller: {seller}</Typography>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignContent: "center" }}
        >
          ⭐ Rating: {Number(rating).toFixed(1)}
          <Rating
            name="half-rating-read"
            defaultValue={+rating}
            precision={0.1}
            size="small"
            readOnly
          />
        </Typography>

        <Typography variant="body2">📦 Stock: {stock}</Typography>
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
      <Box
        sx={{
          p: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Quantity
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={quantity}
            onChange={quantityHandler}
            autoWidth
            label="Quantity"
            size="small"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const cartProducts = {
              id: id,
              product: product_name,
              price: price,
              imageUrl: image_url,
              quantity: quantity,
            };
            console.log(cartProducts);
            onAddToCart(cartProducts);
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default Product;
