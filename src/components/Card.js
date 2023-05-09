import Sale from "./Sale";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Favourite from "./Favourite";
import FavouriteContext from "../store/FavoritesItemsContext";
import { CSSTransition } from "react-transition-group";
import "./Card.modules.css";
import CartItemsContext from "../store/CartItemsContext";

function Card(props) {
  const favCtx = useContext(FavouriteContext);
  const cartCtx = useContext(CartItemsContext);

  function toggleSelected() {
    var id = props.id;
    if (cartCtx.isSelected(id)) {
      cartCtx.removeItem(id);
    } else {
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        displayed_price: props.displayed_price,
        price: props.price,
        image: props.image,
        sale: props.sale,
        category: props.category,
        description: props.description,
      });
    }
  };

  function addFav() {
    var id = props.id;
    if (favCtx.isSelected(id)) {
      favCtx.removeItem(id);
    } else {
      favCtx.addItem({
        id: props.id,
        name: props.name,
        displayed_price: props.displayed_price,
        price: props.price,
        image: props.image,
        sale: props.sale,
        category: props.category,
        description: props.description,
      });
    }
  };

  return (
    <div className="col mb-5">
      <div className="card h-100">
        <Sale sale={props.sale} />

        <img className="card-img-top" src={props.image} alt="..." />
        <Favourite
          onClick={addFav}
          value={favCtx.isSelected(props.id)}
        />

        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">
              <NavLink to={"/item/" + props.id}>{props.name}</NavLink>
            </h5>
            {props.category}
            <br />
            {props.displayed_price !== null &&
            props.displayed_price !== undefined
              ? props.displayed_price
              : "$" + props.price}
            {props.price_displayed}
          </div>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <CSSTransition
              in={cartCtx.isSelected(props.id)}
              timeout={500}
              appear
              classNames="btn-transition"
            >
              <div className="btn-content">
                <button
                  className="btn btn-outline-dark mt-auto"
                  onClick={toggleSelected}
                >
                  {cartCtx.isSelected(props.id) ? (
                    <>Delete From Cart</>
                  ) : (
                    <>Add To Cart</>
                  )}
                </button>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
