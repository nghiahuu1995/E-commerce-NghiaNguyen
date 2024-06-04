import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Products from "../Products/Products";
import { CssBaseline } from "@mui/material";
import { Container, Grid, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CategoryList from "../Products/CategoryList";
const theme = createTheme();
const ProtectedPage = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://192.168.1.32:3001/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          console.error("Error fetching products");
          return;
        }
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchProducts();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>
        <Grid container spacing={2}>
          <Grid item xs={2} md={2} lg={2}>
            <Box sx={{ position: "sticky", top: 0, padding: "24px" }}>
              <CategoryList />
            </Box>
          </Grid>
          <Grid item xs={10} md={8} lg={10}>
            <Products products={products} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default ProtectedPage;
