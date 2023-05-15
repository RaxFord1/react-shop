import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";
import CategoriesContext from "./CategoriesContext";

const CardsContext = createContext({
  items: [],
  reloadItems: () => {},
  minPrice: () => {},
  maxPrice: () => {},
});

export const CardsProvider = ({ children }) => {
  const [cardsData, setCardsData] = useState([]);
  const categoriesCtx = useContext(CategoriesContext);
  const [needUpdateCategories, setNeedUpdateCategories] = useState();

  async function loadItems() {
    axios
      .get(BACKEND_URL + "/items")
      .then((response) => {
        const items = response.data.items;

        const cards = items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            displayed_price: `$${item.price.toFixed(2)}`,
            price: item.price,
            image: item.image_url,
            category_id: item.category_id,
            description: item.description,
            on_sale: item.on_sale,
          };
        });

        setCardsData(cards);
        setNeedUpdateCategories(!needUpdateCategories);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setTimeout(loadItems, 5000);
      });
    // setCardsData([
    //   {
    //     id: "card1",
    //     name: "First Product",
    //     displayed_price: "$80.00",
    //     price: 80.0,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     category: "nft",
    //     description: "First product desctiption.",
    //   },
    //   {
    //     id: "card2",
    //     name: "Second Product",
    //     displayed_price: "$40.00 ",
    //     price: 40.0,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     category: "programming",
    //     description: "",
    //   },
    //   {
    //     id: "card3",
    //     name: "Third Product",
    //     displayed_price: "$40.00 ",
    //     price: 40.0,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     sale: true,
    //     category: "learning",
    //     description: "",
    //   },
    //   {
    //     id: "card4",
    //     name: "Fourth Product",
    //     displayed_price: "$40.00 - $80.00",
    //     price: 70.0,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     category: "learning",
    //     description: "",
    //   },
    //   {
    //     id: "card5",
    //     name: "Fifth Product",
    //     displayed_price: "$40.00 - $80.00",
    //     price: 60.0,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     category: "programming",
    //     description: "",
    //   },
    //   {
    //     id: "card6",
    //     name: "Sixth Product",
    //     displayed_price: "$100.00",
    //     price: 100.0,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     category: "programming",
    //     description: "",
    //   },
    //   {
    //     id: "card7",
    //     name: "Seventh Product",
    //     displayed_price: "$99.99",
    //     price: 99.99,
    //     image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    //     category: "programming",
    //     description: "",
    //   },
    // ]);
  }

  function minPrice() {
    if (cardsData.length === 0) {
      return 0; // default value
    }
    return Math.min(...cardsData.map((card) => card.price));
  }

  function maxPrice() {
    if (cardsData.length === 0) {
      return 100; // default value
    }
    return Math.max(...cardsData.map((card) => card.price));
  }

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const updatedCardsData = cardsData.map((card) => {
      var category = categoriesCtx.getCategory(card.category_id);
      if (category) {
        if (category.length > 0) {
          category = category[0].label;
        }
      }
      return {
        ...card,
        category: category,
      };
    });
    setCardsData(updatedCardsData);
  }, [categoriesCtx.categories, needUpdateCategories]);

  const context = {
    items: cardsData,
    reloadItems: loadItems,
    minPrice: minPrice,
    maxPrice: maxPrice,
  };

  return (
    <CardsContext.Provider value={context}>{children}</CardsContext.Provider>
  );
};

export default CardsContext;
