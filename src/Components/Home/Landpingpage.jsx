import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Card, CardMedia, CardContent, Button, IconButton, Container } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, ArrowForward, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material'; // Import the ShoppingCartIcon
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import NavBar from '../NavBar/NavBar'; // Import the NavBar component
import anime from '../../assets/imgs/1.jpg';
import nature from '../../assets/imgs/nature.jpg';

import group from '../../assets/imgs/2.png';
const Root = styled("div")({
  display: "flex",
  flexDirection: 'column',
});

const Header = styled(AppBar)({
  marginBottom: '20px',
});

const HeroSection = styled(Box)({
  backgroundColor: '#f0f0f0',
  background: 'radial-gradient(circle, rgba(0,124,134,1) 0%, rgba(0,64,140,1) 100%)',
  
  color: '#000000',
  padding: '40px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  height: '70vh',
});

const ContentSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
});

const ProductPreview = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px',
  width: '80%',
  maxWidth: '1200px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ProductDetails = styled(CardContent)({
  flex: '1',
  padding: '20px',
});

const ProductImage = styled(CardMedia)({
  width: '50%',
  paddingRight: '20px',
  transition: 'transform 0.5s ease-in-out',
});

const ArrowButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: '#1976d2',
    color: '#ffffff',
  },
  zIndex: 1,
});
const FooterSection = styled(Box)({
  backgroundColor: '#2c2c2c',
  color: '#ffffff',
  padding: '20px',
  textAlign: 'center',
});
const products = [
  {
    id: 1,
    name: 'Lounge Chair',
    image: anime,
    description: 'A pair of lounge chairs with a sculpted foam seat floating on an espresso stained wood base.',
  },
  {
    id: 2,
    name: 'Modern Lamp',
    image: group,
    description: 'A sleek modern lamp with adjustable brightness and an elegant design.',
  },
  {
    id: 3,
    name: 'Office Desk',
    image: nature,
    description: 'A spacious office desk with ample storage and a minimalist design.',
  },
  {
    id: 4,
    name: 'Coffee Table',
    image: group,
    description: 'A modern coffee table with a sleek glass top and sturdy metal frame.',
  },
];

const ECommerceLandingPage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentProductIndex(prev => prev === 0 ? products.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentProductIndex(prev => prev === products.length - 1 ? 0 : prev + 1);
  };

  const selectedProduct = products[currentProductIndex];

  return (
    <Root>
      <HeroSection >
        <ArrowButton onClick={handlePrev} style={{ left: '90px' }}>
          <ArrowBack />
        </ArrowButton>
        <AnimatePresence mode="wait" >
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, x: 100 * slideDirection }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 * slideDirection }}
            transition={{ duration: 0.5 }}
            style={{display:'flex',justifyContent:'center'}}
          >
            <ProductPreview >
              <ProductImage
                component="img"
                alt={selectedProduct.name}
                image={selectedProduct.image}
              />
              <ProductDetails>
                <Box>
                  <Typography variant="h3" component="div">
                    {selectedProduct.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="p" style={{ margin: '20px 0' }}>
                    {selectedProduct.description}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </Box>
              </ProductDetails>
            </ProductPreview>
          </motion.div>
        </AnimatePresence>
        <ArrowButton onClick={handleNext} style={{ right: '90px' }}>
          <ArrowForward />
        </ArrowButton>
      </HeroSection>

      <ContentSection>
        <Container>
          <Typography variant="h4" component="div" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Contemporary classics that issue from the convergence of the most sophisticated crafting methods and cutting edge technology.
            Alongside the creative and experimental production of the made in Italy industry we find the expertly crafted creations, at times handcrafted,
            typical of BNS service studied to meet the demand for customized furniture, as in an atelier.
          </Typography>
          <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}>
            Read More
          </Button>
        </Container>
      </ContentSection>



      <ContentSection>
        <Container>
          <Typography variant="h4" component="div" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="textSecondary">
            If you have any questions or inquiries, feel free to reach out to us at:
            <br />
            <strong>Email:</strong> contact@ecommerce.com
            <br />
            <strong>Phone:</strong> +123 456 7890
          </Typography>
          <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}>
            Send a Message
          </Button>
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <Typography variant="h4" component="div" gutterBottom>
            Log In to See More
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Access exclusive content and offers by logging into your account. Don't have an account yet? Sign up now!
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '20px', marginRight: '10px' }}>
            Log In
          </Button>
          <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}>
            Sign Up
          </Button>
        </Container>
      </ContentSection>

      <NavBar /> {/* Keeping NavBar on the right side */}
      <FooterSection>
        <Typography variant="body1">
          &copy; 2024 E-Commerce. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <a href="/terms" style={{ color: '#ffffff', textDecoration: 'none' }}>Terms of Service</a> | <a href="/privacy" style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy Policy</a>
        </Typography>
      </FooterSection>
    </Root>
  );
};

export default ECommerceLandingPage;
