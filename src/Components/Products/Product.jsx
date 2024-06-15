import React, { useContext, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { cardBG } from "../Home/formStyling";
import { useNavigate } from "react-router-dom";
import { SelectedProductContext } from "../../contexts/ProductDetailContext";

const productNameStyling = {
  fontWeight: "800",
  color: "#000000",
};

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [isSelectingText, setIsSelectingText] = useState(false);

  const { setSelectedProduct } = useContext(SelectedProductContext);
  const {
    product_name: name,
    price,
    seller,
    description,
    imageURL,
    average_rating: rating,
    stock,
    product_id,
  } = product;

  const handleMouseDown = (e) => {
    const selection = window.getSelection();
    setIsSelectingText(selection.toString().length > 0);
  };

  const handleMouseUp = (e) => {
    const selection = window.getSelection();
    setIsSelectingText(selection.toString().length > 0);
  };

  const navigateProductDetail = (productID) => {
    if (!isSelectingText) {
      const productDetail = {
        product_id,
        name,
        price,
        seller,
        description,
        imageURL,
        average_rating: rating,
        stock,
      };
      setSelectedProduct(productDetail);
      navigate(`/products/${productID}`);
    }
  };

  return (
    <Card
      sx={{
        ...cardBG,
        // width: { xs: "100%", sm: 200, lg: 200 },
        marginBottom: "6px",
        marginTop: "6px",
        margin: "2px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: { xs: "auto" },
        maxHeight: "100%",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={() => navigateProductDetail(product_id)}
    >
      <CardMedia component="img" height="100%" image={imageURL} alt={name} />
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          padding: "0 !important",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          position: "relative",
        }}
      >
        <Typography variant="body1" component="div" sx={productNameStyling}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
