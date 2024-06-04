import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const categories = [
  {
    name: "Electronics",
    subcategories: ["Mobile Phones", "Laptops", "Cameras"],
  },
  {
    name: "Footwear",
    subcategories: ["Running Shoes", "Sandals", "Boots"],
  },
  {
    name: "Home Appliances",
    subcategories: ["Refrigerators", "Microwaves", "Washing Machines"],
  },
  {
    name: "Fitness",
    subcategories: ["Yoga Mats", "Dumbbells", "Resistance Bands"],
  },
  {
    name: "Office Supplies",
    subcategories: ["Desks", "Chairs", "Stationery"],
  },
  {
    name: "Home Decor",
    subcategories: ["Lamps", "Curtains", "Vases"],
  },
  {
    name: "Accessories",
    subcategories: ["Backpacks", "Belts", "Hats"],
  },
];

const CategoryList = () => {
  const [openCategories, setOpenCategories] = useState({});

  const handleToggle = (category) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleHideAll = () => {
    const collapsedCategories = {};
    categories.forEach((category) => {
      collapsedCategories[category.name] = false;
    });
    setOpenCategories(collapsedCategories);
  };

  return (
    <div>
      <List>
        {categories.map((category, index) => (
          <div key={index}>
            <ListItem button onClick={() => handleToggle(category.name)}>
              <ListItemText primary={category.name} />
              {openCategories[category.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openCategories[category.name]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {category.subcategories.map((subcategory, subIndex) => (
                  <ListItem button key={subIndex} sx={{ pl: 4 }}>
                    <ListItemText primary={subcategory} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleHideAll}
        fullWidth
      >
        Hide All
      </Button>
    </div>
  );
};

export default CategoryList;
