import Template from "../layout/Template";
import Header from "../components/Header";
import Body from "../components/Body";
import CardList from "../components/CardList";

import React from "react";
import Select from "react-select";
import CartItemsContext from "../store/CartItemsContext";

//orig: https://startbootstrap.github.io/startbootstrap-shop-homepage/?

export const CardsListData = [
  {
    id: "card1",
    name: "First Product",
    displayed_price: "$80.00",
    price: 80.0,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "nft",
    description: "First product desctiption.",
  },
  {
    id: "card2",
    name: "Second Product",
    displayed_price: "$40.00 ",
    price: 40.0,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
    description: "",
  },
  {
    id: "card3",
    name: "Third Product",
    displayed_price: "$40.00 ",
    price: 40.0,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    sale: true,
    category: "learning",
    description: "",
  },
  {
    id: "card4",
    name: "Fourth Product",
    displayed_price: "$40.00 - $80.00",
    price: 70.0,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "learning",
    description: "",
  },
  {
    id: "card5",
    name: "Fifth Product",
    displayed_price: "$40.00 - $80.00",
    price: 60.0,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
    description: "",
  },
  {
    id: "card6",
    name: "Sixth Product",
    displayed_price: "$100.00",
    price: 100.0,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
    description: "",
  },
  {
    id: "card7",
    name: "Seventh Product",
    displayed_price: "$99.99",
    price: 99.99,
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
    description: "",
  },
];

const categories = [
  { value: "programming", label: "Programming" },
  { value: "learning", label: "Learning" },
  { value: "nft", label: "NFT" },
];

const CategorySelection = (props) => (
  <Select options={props.options} isMulti onChange={props.onChange} />
);

class IndexPage extends React.Component {
  static contextType = CartItemsContext;

  constructor(props) {
    super();
    console.log("props.selectedItems", props.selectedItems);
    this.state = {
      counter: 0,
      selected_counter: props.totalSelectedItems,
      rendered: 0,
      selected_items: props.selectedItems,
      selected_categories: [],
      displayed_items: 0,
    };
    this.cardListRef = React.createRef();
  }

  componentWillMount() {
    console.log("upd: this.context.selectedItems");
    this.setState((prevState) => ({
      ...prevState,
      selected_items: this.context.selectedItems,
      selected_counter: this.context.totalSelectedItems,
    }));
  }

  handleChangeCategory = (selectedOption) => {
    this.setState(
      (prevState) => ({ selected_categories: selectedOption }),
      () => this.cardListRef.current.updateCategories(selectedOption)
    );
  };

  onItemSelectHandler = (id) => {
    var element = CardsListData.find((element) => element.id === id);

    this.setState(
      (prevState) => {
        var ids = prevState.selected_items.filter((item) => item.id !== id);
        if (ids.length === prevState.selected_items.length) {
          return {
            ...prevState,
            selected_items: [...prevState.selected_items, element],
          };
        } else {
          return {
            ...prevState,
            selected_items: [...ids],
          };
        }
      },
      () => {
        this.cardListRef.current.updateSelected(this.state.selected_items);
        const cartCtx = this.context;
        if (cartCtx.isSelected(element.id)) {
          cartCtx.removeItem(element.id);
        } else {
          cartCtx.addItem(element);
        }
      }
    );
  };

  updateDisplayed = (length) => {
    this.setState((oldState) => {
      return { ...oldState, displayed_items: length };
    });
  };

  onRenderHandler = () => {
    this.setState((prevState) => {
      return { ...prevState, rendered: prevState.rendered + 1 };
    });
  };

  render() {
    console.log(
      "render: this.context.selectedItems",
      this.context.selectedItems
    );
    return (
      <Template selected_counter={this.state.selected_items.length}>
        <Header
          title="Buy any file you want"
          description="With our website u can achieve anything!"
        />
        <Body
          rendered={this.state.rendered}
          cardsToShow={this.state.displayed_items}
        >
          <CategorySelection
            options={categories}
            onChange={this.handleChangeCategory}
          />
          <div className="container px-4 px-lg-5 mt-5">
            <CardList
              cards={CardsListData}
              categories={this.state.selected_categories}
              selected_items={this.state.selected_items}
              onRender={this.onRenderHandler}
              onSelect={this.onItemSelectHandler}
              onUpdate={this.updateDisplayed}
              ref={this.cardListRef}
            />
          </div>
        </Body>
      </Template>
    );
  }
}

export default IndexPage;
