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
  const item = props.item;

  function toggleSelected() {
    var id = item.id;
    cartCtx.toggleSelected(id)
  }

  function toggleFavourite() {
    favCtx.toggleSelected(item.id);
  }

  return (
    <div className="col mb-5">
      <div className="card h-100">
        <Sale sale={item.on_sale} />

        <img className="card-img-top" src={item.image} alt="..." />
        <Favourite onClick={toggleFavourite} value={favCtx.isSelected(item.id)} />

        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">
              <NavLink to={"/item/" + item.id}>{item.name}</NavLink>
            </h5>
            {item.category}
            <br />
            {item.displayed_price !== null && item.displayed_price !== undefined
              ? item.displayed_price
              : "$" + item.price}
            {item.price_displayed}
          </div>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <CSSTransition
              in={cartCtx.isSelected(item.id)}
              timeout={500}
              appear
              classNames="btn-transition"
            >
              <div className="btn-content">
                <button
                  className="btn btn-outline-dark mt-auto"
                  onClick={toggleSelected}
                >
                  {cartCtx.isSelected(item.id) ? (
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
