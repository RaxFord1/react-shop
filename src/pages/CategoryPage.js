import Template from "../layout/Template";
import Header from "../components/Header";

import React from "react";
import Select from "react-select";
import CartItemsContext from "../store/CartItemsContext";
import { useMatch, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Card from "../components/Card";
import CardsContext from "../store/CardsContext";
import CategoriesContext from "../store/CategoriesContext";

const CategorySelection = (props) => (
  <Select options={props.options} onChange={props.onChange} />
);

function CategoryPage() {
  const categories = useContext(CategoriesContext);
  const cardCtx = useContext(CardsContext);
  const cartCtx = useContext(CartItemsContext);

  let navigation = useNavigate();

  function onChangeCategory(value) {
    if (value.length !== 0) {
      navigation("/category/" + value.label);
    }
  }

  const match = useMatch("/category/:category");
  let cards = cardCtx.items;
  console.log("cards", cards);
  if (match && match.params) {
    let category = [match.params.category];
    cards = cards.filter((item) => item.category === category[0]);
  }

  return (
    <Template
      selected_counter={
        cartCtx.totalSelectedItems ? cartCtx.totalSelectedItems : 0
      }
    >
      <Header
        title="Buy any file you want"
        description="With our website u can achieve anything!"
      />

      <CategorySelection
        options={categories.categories}
        onChange={onChangeCategory}
      />
      {cards.length !== 0 ? (
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {cards.map((item) => {
              console.log(item.id);
              return <Card key={item.id} item={item} />;
            })}
          </div>
        </div>
      ) : (
        <div>Cards not found! Select another category</div>
      )}
    </Template>
  );
}

export default CategoryPage;
