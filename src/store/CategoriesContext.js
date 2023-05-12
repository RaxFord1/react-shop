import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";

const CategoriesContext = createContext({
    categories: [{}],
    getCategory: (id) => {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([{}]);

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/categories")
      .then((response) => {
        const items = response.data.items;

        const categories = items.map((item) => ({
          id: item.id,
          label: item.name,
          value: item.value,
        }));

        setCategoriesData(categories);
        // setCategoriesData([
        //   { value: "programming", label: "Programming" },
        //   { value: "learning", label: "Learning" },
        //   { value: "nft", label: "NFT" },
        // ]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  function getCategiryById(categoryId) {
    return categoriesData.filter((element) => element.id === categoryId) 
  }

  const context = {
    categories: categoriesData,
    getCategory: getCategiryById
  };

  return (
    <CategoriesContext.Provider value={context}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
