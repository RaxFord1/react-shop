import Card from "./Card";
import React from "react";
import CartItemsContext from "../store/CartItemsContext";

class CardListRelated extends React.Component {
  static contextType = CartItemsContext;

  constructor(props) {
    super();
    this.state = {
      cards: props.cards,
      category: props.category,
      selected_items: [],
    };

    this.onSelect = props.onSelect;
    this.onUpdate = props.onUpdate;
    this.selectCard = () => {};
  }

  componentWillMount() {
    console.log("upd: this.context.selectedItems");
    this.setState((prevState) => ({
      ...prevState,
      selected_items: this.context.selectedItems,
      selected_counter: this.context.totalSelectedItems,
    }));
  }

  onSelectCard = (id) => {
    var element = this.state.cards.find((element) => element.id === id);
    var isSelected = this.context.isSelected(id);
    if (isSelected) {
      this.context.removeItem(id);
    } else {
      this.context.addItem({
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
  };

  render() {
    return (
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {this.state.cards.map((item) => {
              var isSelected = this.context.isSelected(item.id);
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
                  onSelect={this.onSelectCard}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default CardListRelated;
