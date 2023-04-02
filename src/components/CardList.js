import Card from "./Card";
import React from "react";

class CardList extends React.Component {
  constructor(props) {
    super();
    var categories = props.categories === undefined ? [] : props.categories;
    var selected_items =
      props.selected_items === undefined ? [] : props.selected_items;
    this.state = {
      cards: props.cards,
      selected_cards: selected_items,
      rendered: false,
      categories: categories,
      cardsToShow: this.cardsToShowCalc(props.cards, props.categories),
    };

    this.onRender = props.onRender;
    this.onSelect = props.onSelect;
    this.onUpdate = props.onUpdate;
    this.selectCard = () => {};
  }

  cardsToShowCalc = (cards, categories) => {
    if (categories.length === 0) {
      return cards;
    } else {
      return cards.filter((item) =>
        categories.some((cat) => cat.value === item.category)
      );
    }
  };

  updateCategories = (categories_selected) => {
    const cardsToShow = this.cardsToShowCalc(
      this.props.cards,
      categories_selected
    );
    this.setState((old_state) => {
      return {
        ...old_state,
        categories: categories_selected,
        cardsToShow: cardsToShow,
      };
    });
  };

  updateSelected = (selected_cards) => {
    this.setState((old_state) => {
      return {
        ...old_state,
        selected_cards: selected_cards,
      };
    });
  };

  render() {
    console.log("this.state.cardsToShow",this.state.cardsToShow)
    console.log("this.state.cards",this.state.cards)
    return (
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {this.state.cardsToShow.map((item) => {
          var isSelected = false;
          var selected = this.state.selected_cards.filter(
            (selected_item) => item.id === selected_item.id
          );
          if (selected.length !== 0) {
            isSelected = true;
          }
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
              onRender={this.onRender}
              onSelect={this.onSelect}
            />
          );
        })}
        <div />
      </div>
    );
  }
}

export default CardList;
