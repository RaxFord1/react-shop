import Template from "../layout/Template";
import Header from "../components/Header";
import Body from "../components/Body";
import CardList from "../components/CardList";

import React from "react";
import Select from "react-select";

//orig: https://startbootstrap.github.io/startbootstrap-shop-homepage/?

const CardsListData = [
  {
    id: "card1",
    name: "First Product",
    price: "$80.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "nft",
  },
  {
    id: "card2",
    name: "Second Product",
    price: "$40.00 ",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
  },
  {
    id: "card3",
    name: "Third Product",
    price: "$40.00 ",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    sale: true,
    category: "learning",
  },
  {
    id: "card4",
    name: "Fourth Product",
    price: "$40.00 - $80.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "learning",
  },
  {
    id: "card5",
    name: "Fifth Product",
    price: "$40.00 - $80.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
  },
  {
    id: "card6",
    name: "Sixth Product",
    price: "$100.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
  },
  {
    id: "card7",
    name: "Seventh Product",
    price: "$99.99",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    category: "programming",
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
  constructor(props) {
    super();
    this.state = {
      counter: 0,
      selected_counter: 0,
      rendered: 0,
      selected_items: [],
      selected_categories: [],
      displayed_items: 0,
    };
    this.cardListRef = React.createRef();
  }

  handleChangeCategory = (selectedOption) => {
    this.setState(
      (prevState) => ({ selected_categories: selectedOption }),
      () => this.cardListRef.current.updateCategories(selectedOption)
    );
  };

  onItemSelectHandler = (id) => {
    this.setState(
      (prevState) => {
        var ids = prevState.selected_items.filter((item) => item.id !== id);
        if (ids.length === prevState.selected_items.length) {
          var element = CardsListData.find((element) => element.id === id);
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
      () => this.cardListRef.current.updateSelected(this.state.selected_items)
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
