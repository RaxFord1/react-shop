import Template from "../layout/Template";
import Header from "../components/Header";
import CardList from "../components/CardList";

import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import CardsContext from "../store/CardsContext";
import CategoriesContext from "../store/CategoriesContext";
import MinMaxSlider from "../components/MinMaxSlider";

//orig: https://startbootstrap.github.io/startbootstrap-shop-homepage/?

function IndexPage() {
  const categoriesCtx = useContext(CategoriesContext);
  const cardCtx = useContext(CardsContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  let minPrice = cardCtx.minPrice();
  let maxPrice = cardCtx.maxPrice();

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  const handleChangeCategory = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  return (
    <Template>
      <Header
        title="Buy any file you want"
        description="With our website u can achieve anything!"
      />
      <section className="py-5">
        <Select
          options={categoriesCtx.categories}
          isMulti
          onChange={handleChangeCategory}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MinMaxSlider
            min={minPrice}
            max={maxPrice}
            step={1}
            onChange={setPriceRange}
          />
        </div>

        <div className="container px-4 px-lg-5 mt-5">
          <CardList
            cards={cardCtx.items.filter(
              (card) =>
                card.price >= priceRange.min && card.price <= priceRange.max
            )}
            categories={selectedCategories}
          />
        </div>
      </section>
    </Template>
  );
}
export default IndexPage;
