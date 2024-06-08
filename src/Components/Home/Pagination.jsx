import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prevPageHandler = () => {
    onPageChange((currentPage) =>
      currentPage > 1 ? currentPage - 1 : currentPage
    );
  };
  const nextPageHandler = () => {
    onPageChange((currentPage) =>
      currentPage < totalPages ? currentPage + 1 : currentPage
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Button onClick={prevPageHandler}>Previous</Button>

        {pagesArr.map((pageNumber, i) => (
          <Link
            to={`/products?page=${pageNumber}&limit=${itemsPerPage}`}
            key={i}
          >
            <Button
              size="small"
              variant="contained"
              disabled={pageNumber === currentPage}
              key={i}
              sx={{
                minWidth: "24px",
                margin: "0 4px ",
                fontSize: "16px",
                lineHeight: "16px",
              }}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          </Link>
        ))}
        <Button onClick={nextPageHandler}>Next</Button>
      </Box>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        Page {currentPage} of {totalPages}
      </Typography>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        Total products: {totalItems}
      </Typography>
    </>
  );
};

export default Pagination;
