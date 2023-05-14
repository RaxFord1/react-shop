import Card from "./Card";
import React from "react";

export function cardsToShowCalc(cards, categories) {
  categories = categories === undefined ? [] : categories;
  if (categories.length === 0) {
    return cards;
  } else {
    return cards.filter((item) =>
      categories.some((cat) => cat.label === item.category)
    );
  }
}

function CardList(props) {
  const cardsToShow = cardsToShowCalc(props.cards, props.categories);
  console.log("this.state.cardsToShow", cardsToShow);

  return (
    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
      {cardsToShow.map((item) => {
        console.log(item.id);
        return (
          <Card
            key={item.id}
            item={item}
          />
        );
      })}
      <div />
    </div>
  );
}

export default CardList;
