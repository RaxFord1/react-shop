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
      selected: [],
      selected_categories: [],
    };
  }

  handleChangeCategory = (selectedOption) => {
    this.setState((prevState) => {
      return { ...prevState, selected_categories: selectedOption };
    });
    console.log(selectedOption);
  };

  onItemSelectHandler = (id) => {
    this.setState((prevState) => {
      var ids = prevState.selected.filter((item) => item.id !== id);
      if (ids.length === prevState.selected.length) {
        var element = CardsListData.find((element) => element.id === id);
        return {
          ...prevState,
          selected_counter: prevState.selected_counter + 1,
          selected: [...prevState.selected, element],
        };
      } else {
        return {
          ...prevState,
          selected_counter: prevState.selected_counter - 1,
          selected: [...ids],
        };
      }
    });
  };

  onRenderHandler = () => {
    this.setState((prevState) => {
      return { ...prevState, rendered: prevState.rendered + 1 };
    });
  };

  render() {
    console.log("this.state.selected", this.state.selected);
    var cardsToShow = [];
    if (this.state.selected_categories.length === 0) {
      cardsToShow = CardsListData;
    } else {
      cardsToShow = CardsListData.filter((item) =>
        this.state.selected_categories.some(
          (cat) => cat.value === item.category
        )
      );
    }
    return (
      <Template selected_counter={this.state.selected_counter}>
        <Header
          title="Buy any file you want"
          description="With our website u can achieve anything!"
        />
        <Body rendered={this.state.rendered} cardsToShow={cardsToShow}>
          <CategorySelection options={categories} onChange={this.handleChangeCategory} />
          <div className="container px-4 px-lg-5 mt-5">
            <CardList
              cards={cardsToShow}
              onRender={this.onRenderHandler}
              onSelect={this.onItemSelectHandler}
            />
          </div>
        </Body>
      </Template>
    );
  }
}

export default IndexPage;
