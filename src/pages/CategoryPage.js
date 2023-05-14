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
      navigation("/category/" + value.value);
    }
  }

  const match = useMatch("/category/:category");
  let cards = cardCtx.items;
  console.log("cards", cards);
  if (match !== null && match.params !== undefined) {
    let category = [match.params.category];
    console.log("category", category);
    cards = cards.filter((item) => item.category === category[0]);
    console.log("cards", cards);
  }

  function onSelectCard(id) {
    var element = cards.find((element) => element.id === id);
    var isSelected = cartCtx.isSelected(id);
    if (isSelected) {
      cartCtx.removeItem(id);
    } else {
      cartCtx.addItem({
        id: element.id,
        name: element.name,
        displayed_price: element.displayed_price,
        price: element.price,
        image: element.image,
        sale: element.sale,
        category: element.category,
        description: element.description,
      });
    }
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

      <CategorySelection options={categories} onChange={onChangeCategory} />
      {cards.length !== 0 ? (
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {cards.map((item) => {
              var isSelected = cartCtx.isSelected(item.id);
              console.log(item.id);
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  price={item.price}
                  sale={item.sale}
                  name={item.name}
                  selected={isSelected}
                  category={item.category}
                  displayed_price={item.displayed_price}
                  onSelect={onSelectCard}
                />
              );
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
