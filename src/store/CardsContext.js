import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cardsData, setCardsData] = useState([]);

  function loadItems() {
    axios
      .get(BACKEND_URL + "/items")
      .then((response) => {
        const items = response.data.items;

        const cards = items.map((item) => ({
          id: item.id,
          name: item.name,
          displayed_price: `$${item.price.toFixed(2)}`,
          price: item.price,
          image: item.image_url,
          category: item.category_id,
          description: item.description,
        }));

        setCardsData(cards);
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

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <CardsContext.Provider value={cardsData}>{children}</CardsContext.Provider>
  );
};

export default CardsContext;
