import React, { useState } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import NavBar from '../NavBar/NavBar';  // Import the NavBar component
import { ArrowBack, ArrowForward } from '@mui/icons-material';
const Root = styled("div")({
  display: "flex",
});

const Content = styled(Box)({
  marginTop: "50px",
  marginRight: "80px", // Adjust margin to account for the fixed sidebar
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Ensure it takes up full height of the viewport
  padding: "0 20px", // Add some horizontal padding for better spacing
  position: 'relative', // For positioning arrows
});

const ProductCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px',
  width: '80%', // Make the product detail cover 80% of the page
  maxWidth: '1200px', // Set a max width for larger screens
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Add a subtle shadow
});

const ProductDetails = styled(CardContent)({
  flex: '1',
  padding: '20px',
});

const ProductImage = styled(CardMedia)({
  width: '50%',
  paddingRight: '20px',
});

const product = {
  name: 'Lounge Chair',
  image: 'https://via.placeholder.com/600',
  description: 'A pair of lounge chairs with a sculpted foam seat floating on an espresso stained wood base.',
  price: '$45.50',
};
const products = [
  { id: 1, name: 'Lounge Chair', image: 'https://via.placeholder.com/600', description: 'A pair of lounge chairs with a sculpted foam seat floating on an espresso stained wood base.', price: '$45.50' },
  { id: 2, name: 'Modern Lamp', image: 'https://via.placeholder.com/600', description: 'A sleek modern lamp with adjustable brightness and an elegant design.', price: '$30.00' },
  { id: 3, name: 'Office Desk', image: 'https://via.placeholder.com/600', description: 'A spacious office desk with ample storage and a minimalist design.', price: '$120.00' },
];
const Home = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentProductIndex(prev =>  prev === 0 ? products.length - 1: prev - 1);
  }
  const handleNext = () => {
setCurrentProductIndex(prev => prev === products.length - 1 ? 0 : prev + 1);
  }
  const selectedProduct = products[currentProductIndex];
  console.log(selectedProduct);
  return (
    <Root>
      <NavBar />
      <Content>
      <IconButton onClick={handlePrev} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <ArrowBack />
        </IconButton>
        <ProductCard>
          <ProductImage
            component="img"
            alt={selectedProduct.name}
            image={selectedProduct.image}
          />
          <ProductDetails>
            <Typography variant="h3" component="div">
              {selectedProduct.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p" style={{ margin: '20px 0' }}>
              {selectedProduct.description}
            </Typography>
            <Typography variant="h4" component="div" color="primary">
              {selectedProduct.price}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Add to Cart
            </Button>
          </ProductDetails>
        </ProductCard>
        <IconButton onClick={handleNext} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <ArrowForward />
        </IconButton>
      </Content>
    </Root>
  );
};

export default Home;
