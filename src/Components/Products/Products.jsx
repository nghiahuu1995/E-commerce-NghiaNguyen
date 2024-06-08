import React from "react";
import Product from "./Product";
import { Container, Grid, Typography } from "@mui/material";

const Products = ({ products = [], onAddToCart }) => {
  return (
    <Container sx={{ padding: 0 }}>
      <Typography variant="h4" component="h2" sx={{ my: 4 }}>
        Products
      </Typography>
      <Grid
        container
        spacing={0} // Add spacing between the grid items
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                padding: "0px",
                margin: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="p" sx={{ my: 4 }}>
            No products available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Products;
