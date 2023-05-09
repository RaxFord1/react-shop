import Card from "./Card";
import React, { useState } from "react";

function CardList(props) {
  const [cards, setCards] = useState(props.cards);
  var categories = props.categories === undefined ? [] : props.categories;
  const cardsToShow = cardsToShowCalc(props.cards, props.categories);
  console.log("this.state.cardsToShow", cardsToShow);
  console.log("this.state.cards", cards);

  function cardsToShowCalc(cards, categories) {
    if (categories.length === 0) {
      return cards;
    } else {
      return cards.filter((item) =>
        categories.some((cat) => cat.value === item.category)
      );
    }
  }
  
  return (
    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
      {cardsToShow.map((item) => {
        console.log(item.id);
        return (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            price={item.price}
            sale={item.sale}
            name={item.name}
            category={item.category}
          />
        );
      })}
      <div />
    </div>
  );
}

export default CardList;
