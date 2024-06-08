import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "../NavBar/Search";
import Products from "../Products/Products";
import CategoryList from "../Products/CategoryList";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../../contexts/CartContext";

const theme = createTheme();

const ProtectedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    parseInt(searchParams.get("limit")) || 10
  );
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://192.168.1.32:3001/products");
        if (!res.ok) {
          console.error("Error fetching products");
          return;
        }
        const data = await res.json();
        setAllProducts(data.products);
        setFilteredProducts(data.products);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchAllProducts();
  }, [itemsPerPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredProducts(allProducts.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
  }, [allProducts, currentPage, itemsPerPage]);

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
    setSearchParams({ page, limit: itemsPerPage });
  };

  const itemsPerPageChangeHandler = (event) => {
    const newLimit = event.target.value;
    setItemsPerPage(newLimit);
    setSearchParams({ page: 1, limit: newLimit });
    setCurrentPage(1);
  };

  const searchHandler = (params) => {
    const filtered = allProducts.filter((product) =>
      product.product_name.toLowerCase().includes(params.toLowerCase())
    );
    setFilteredProducts(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const addToCartHandler = (addedProduct) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === addedProduct.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === addedProduct.id
            ? { ...item, quantity: item.quantity + addedProduct.quantity }
            : item
        );
      } else {
        return [...prevItems, addedProduct];
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar searchHandler={searchHandler} />
      {/* <Search onSearchHandler={searchHandler} /> */}
      <Grid container spacing={0} sx={{ marginTop: "12px" }}>
        <Grid
          item
          xs={0}
          md={2}
          lg={2}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: 36,
              marginTop: "12px",
              paddingLeft: "12px",
            }}
          >
            <CategoryList />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ padding: "0" }}>
          <Box>
            <Products
              products={filteredProducts}
              onAddToCart={addToCartHandler}
            />
          </Box>
        </Grid>

        <Grid item xs={0} md={2} lg={2}></Grid>
      </Grid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={pageChangeHandler}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Items per page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemsPerPage}
          label="Items per page"
          onChange={itemsPerPageChangeHandler}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default ProtectedPage;
