import React, { useContext, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonGroup,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { SelectedProductContext } from "../../contexts/ProductDetailContext";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../../contexts/CartContext";
const h5Styling = {
  fontWeight: "800",
  color: "#000000",
  fontFamily: "sans-serif",
};
const ProductDetails = () => {
  const { selectedProduct } = useContext(SelectedProductContext);
  const { addToCartHandler } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const quantityHandler = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  console.log(selectedProduct);
  const {
    product_id,
    name,
    product,
    seller,
    average_rating,
    price,

    imageURL,
  } = selectedProduct;
  console.log(addToCartHandler);
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 12 }}>
        <Box elevation={3} sx={{ p: 0 }}>
          <Grid container spacing={2}>
            {/* Product Image */}

            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
              }}
            >
              <Grid item xs={5} md={5}>
                <img
                  src={imageURL}
                  alt={name}
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={5} md={5} sx={{ paddingLeft: "24px" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  ${price}
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  Sold by: {seller}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Rating name="read-only" value={average_rating} readOnly />
                  {Number(average_rating).toFixed(1)}
                </Typography>

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
                <Box sx={{}}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Product Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedProduct.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  border: "1px solid #c4c4c4",
                  borderRadius: "12px",
                  p: 2,
                  position: "relative",
                }}
              >
                <Typography variant="body1" sx={h5Styling}>
                  Free Shipping
                </Typography>
                <ButtonGroup
                  orientation="vertical"
                  sx={{ position: "absolute", bottom: "12px" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="sm"
                    sx={{ marginTop: "6px", marginBottom: "6px" }}
                    onClick={() => {
                      const addedProduct = {
                        product_id: product_id,
                        product: name,
                        price: price,
                        imageURL: imageURL,
                        quantity: quantity,
                      };

                      addToCartHandler(addedProduct);
                    }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    size="sm"
                    color="primary"
                    sx={{ marginTop: "6px", marginBottom: "6px" }}
                  >
                    Buy Now
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetails;
