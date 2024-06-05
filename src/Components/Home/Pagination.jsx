import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Button onClick={prevPageHandler}>Previous</Button>
      <Typography sx={{ margin: "0 1rem" }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button onClick={nextPageHandler}>Next</Button>
    </Box>
  );
};

export default Pagination;
