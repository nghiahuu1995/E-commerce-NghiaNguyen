import { List, ListItem, ListItemText } from "@mui/material";

const categories = [
  "Electronics",
  "Footwear",
  "Home Appliances",
  "Fitness",
  "Office Supplies",
  "Home Decor",
  "Accessories",
];

const CategoryList = ({ onSelectCategory, onReset }) => {
  const categoryHandler = (category) => {
    onSelectCategory(category);
  };

  return (
    <List
      sx={{
        display: "flex",
        marginTop: "48px",
        p: 0,
        height: "32px",
        textAlign: "center",
        backgroundColor: "#232F3E",
      }}
    >
      {/* <Button
        variant="contained"
        size="small"
        sx={{ fontSize: "12px", width: "32px" }}
        color="primary"
        onClick={onReset}
      >
        Reset
      </Button> */}
      {categories.map((category, index) => (
        <ListItem
          button
          sx={{
            color: "#ffffff",
            textAlign: "center",
            "&:hover": {
              border: "1px solid white",
              borderRadius: "2px",
            },
          }}
          key={index}
          onClick={() => categoryHandler(category)}
        >
          <ListItemText primary={category} />
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
