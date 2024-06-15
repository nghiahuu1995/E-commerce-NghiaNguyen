import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Box } from "@mui/material";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const styling = {
  width: "40%",
  maxWidth: "100%",
  color: "#ffffff",
  height: "36px",

  zIndex: "1000",
};
export default function Search({ searchHandler }) {
  return (
    <Box
      sx={{
        ...styling,
        display: "flex",
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesomeIcon icon={faSearch} size="sm" sx={styling} />
      <Input
        // fullWidth
        sx={{
          backgroundColor: "#ffffff",
          paddingLeft: "12px",
          marginLeft: "12px",
          marginRight: "12px",
          maxWidth: "100%",
          width: "100%",
          height: "36px",
          borderRadius: "4px",
          border: "none",
        }}
        placeholder="Search"
        onInput={(e) => searchHandler(e.target.value)}
      />
    </Box>
  );
}
