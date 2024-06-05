import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Container, Grid, Typography } from "@mui/material";
const Products = ({ products = [] }) => {
  return (
    <Container>
      <Typography variant="h4" component="h2" sx={{ my: 4 }}>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Product product={product} />
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
