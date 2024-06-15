import React from "react";
import Product from "./Product";
import { Container, Grid, Typography } from "@mui/material";

const Products = ({ products = [] }) => {
  return (
    <Container sx={{ padding: 0, position: "relative" }}>
      <Grid container>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              key={index}
              sx={{
                padding: "0px",
                margin: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
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
