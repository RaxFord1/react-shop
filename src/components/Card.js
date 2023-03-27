import Sale from "./Sale";
import React from "react";

class Card extends React.Component {
  constructor(props) {
    super();
    var selected = props.selected;
    if (selected === undefined) {
      selected = false;
    }
    this.state = {
      selectedState: selected,
      rendered: false,
    };
    this.id = props.id;
    this.sale = props.sale;
    this.image = props.image;
    this.name = props.name;
    this.price = props.price;
    this.category = props.category;
    this.onRender = props.onRender;
    this.onItemSelectHandler = props.onSelect;
    this.selectCard = () => {};
  }

  handleClick = () => {
    this.setState((prevState) => {
      this.onItemSelectHandler(this.id);
      if (prevState.selectedState) {
        prevState.selectedState = false;
      } else {
        prevState.selectedState = true;
      }
      return prevState;
    });
  };

  componentDidMount() {
    if (!this.state.rendered) {
      this.setState((prevState) => {
        return { ...prevState, rendered: true };
      });
      this.onRender();
    }
  }

  render() {
    return (
      <div className="col mb-5">
        <div className="card h-100">
          <Sale sale={this.sale} />

          <img className="card-img-top" src={this.image} alt="..." />

          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{this.name}</h5>
              {this.category}
              <br />
              {this.price}
            </div>
          </div>

          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button
                className="btn btn-outline-dark mt-auto"
                onClick={this.handleClick}
              >
                {this.state.selectedState ? (
                  <>Delete From Cart</>
                ) : (
                  <>Add To Cart</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
