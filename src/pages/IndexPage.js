import Template from "../layout/Template";
import Header from "../components/Header";
import Body from "../components/Body";
import CardList from "../components/CardList";

import React, { useState, useContext } from "react";
import Select from "react-select";
import CardsContext from "../store/CardsContext";
import CategoriesContext from "../store/CategoriesContext";

//orig: https://startbootstrap.github.io/startbootstrap-shop-homepage/?

function IndexPage(props) {
  const categoriesCtx = useContext(CategoriesContext);
  const cardCtx = useContext(CardsContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChangeCategory = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  return (
    <Template>
      <Header
        title="Buy any file you want"
        description="With our website u can achieve anything!"
      />
      <Body>
        <Select
          options={categoriesCtx.categories}
          isMulti
          onChange={handleChangeCategory}
        />
        <div className="container px-4 px-lg-5 mt-5">
          <CardList cards={cardCtx.items} categories={selectedCategories} />
        </div>
      </Body>
    </Template>
  );
}
export default IndexPage;
