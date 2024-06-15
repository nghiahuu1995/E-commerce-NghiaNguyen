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
import Products from "../Products/Products";
import CategoryList from "../Products/CategoryList";
import NavBar from "../NavBar/NavBar";
import { CartContext } from "../../contexts/CartContext";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { mainBG } from "./formStyling";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowButton, ContentSection } from "./LandingPageStylings";
const theme = createTheme();
const sections = [
  {
    title: "Welcome to Our E-Commerce Site",
    description:
      "The best place to find amazing products at unbeatable prices.",

    videoURL:
      "https://storage.googleapis.com/webapp-assets-images/Videos/welcome.mp4",
  },
  {
    title: "Our Promise",
    description:
      "We promise to provide the highest quality products and the best customer service. Our team is dedicated to ensuring your satisfaction with every purchase.",
    videoURL:
      "https://storage.googleapis.com/webapp-assets-images/Videos/promise.mp4",
  },
  {
    title: "Our Guarantee",
    description:
      "We guarantee that every product you buy from us will meet your expectations. If you are not completely satisfied, we offer a hassle-free return policy.",
    videoURL:
      "https://storage.googleapis.com/webapp-assets-images/Videos/guarantee.mp4",
  },
  {
    title: "What We Do",
    description:
      "Our website offers a wide range of products, from electronics to home goods, all at competitive prices. We strive to provide an exceptional shopping experience with fast shipping and excellent customer support.",
    videoURL:
      "https://storage.googleapis.com/webapp-assets-images/Videos/warehouse.mp4",
  },
  {
    title: "Customer Testimonials",
    description:
      "Don't just take our word for it, hear what our customers have to say about their shopping experience with us.",
    videoURL:
      "https://storage.googleapis.com/webapp-assets-images/Videos/shipping.mp4",
  },
  {
    title: "Contact Information",
    description:
      "Have questions or need support? Get in touch with us through our contact page.",
    videoURL:
      "https://storage.googleapis.com/webapp-assets-images/Videos/contact.mp4",
  },
];
const ProtectedPage = () => {
  // Slider section
  const [slideDirection, setSlideDirection] = useState(1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

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

  const selectedSection = sections[currentSectionIndex];
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/products");
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

  const categoryHandler = (category) => {
    const filtered = allProducts.filter(
      (product) => product.category_name === category
    );
    setFilteredProducts(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };
  const handleReset = () => {
    setFilteredProducts(allProducts);
    setTotalItems(allProducts.length);
    setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
    setCurrentPage(1);
  };
  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentSectionIndex((prev) =>
      prev === 0 ? sections.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentSectionIndex((prev) =>
      prev === sections.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <NavBar searchHandler={searchHandler} />
      <CategoryList onSelectCategory={categoryHandler} onReset={handleReset} />
      <motion.div
        id="welcome"
        className="hero-section"
        initial={{
          background: "#ffffff",
        }}
        animate={{}}
        transition={{ duration: 1.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "800px",
          position: "absolute",
          overflow: "hidden",
          background: "linear-gradient(0deg, #000000, #de1f1f)",
        }}
      >
        <ArrowButton
          onClick={handlePrev}
          style={{ left: "270px" }}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "blue",
              color: "#ffffff",
            },
          }}
        >
          <ArrowBack sx={{ color: "white" }} />
        </ArrowButton>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSection.title}
            initial={{ opacity: 0, x: 100 * slideDirection }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 * slideDirection }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "800px",
              position: "absolute",
              overflow: "hidden",
              background: "linear-gradient(0deg, #ececec, #ffffff)",
            }}
          >
            {" "}
            <ContentSection
              sx={{
                position: "absolute",
                top: "0",
              }}
            >
              <Container>
                {/* <Typography
                  variant="h2"
                  component="div"
                  color="#ffffbb"
                  gutterBottom
                >
                  {selectedSection.title}
                </Typography>
                <Typography
                  variant="h5"
                  color="#cce3ff"
                  style={{ fontWeight: 700 }}
                >
                  {selectedSection.description}
                </Typography> */}
                <Box>
                  <video
                    loop
                    muted
                    autoPlay
                    src={selectedSection.videoURL}
                    style={{
                      position: "absolute",
                      top: "-40px",
                      width: "400px",
                      height: "400px",
                      transform: "translateX(-50%)",
                    }}
                  />
                </Box>
              </Container>
            </ContentSection>
          </motion.div>
        </AnimatePresence>
        <ArrowButton
          onClick={handleNext}
          // style={{ right: "90px" }}
          sx={{
            right: "270px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "blue",
              color: "#ffffff",
            },
          }}
        >
          <ArrowForward sx={{ color: "white" }} />
        </ArrowButton>
      </motion.div>
      <Grid
        container
        spacing={0}
        sx={{ ...mainBG, marginTop: "300px", zIndex: "10000" }}
      >
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
          ></Box>
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ padding: "0" }}>
          <Box>
            <Products products={filteredProducts} />
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
