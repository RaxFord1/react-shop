import React, { useContext } from "react";
import Template from "../layout/Template";
import CardListRelated from "../components/CardListRelated";
import Sale from "../components/Sale";
import { useParams } from "react-router-dom";
import Reviews from "../layout/Reviews";
import WriteReview from "../components/WriteReview";
import CartItemsContext from "../store/CartItemsContext";
import CardsContext from "../store/CardsContext";

function ItemPage(props) {
  const cardCtx = useContext(CardsContext);
  const cartCtx = useContext(CartItemsContext);

  const { id } = useParams();

  const itemIsSelected = cartCtx.isSelected(id);

  var element = cardCtx.filter((item) => String(item.id) === String(id));

  if (element.length === 0) {
    return (
      <Template>
        <section className="py-5">Item not found</section>
        <CardListRelated cards={cardCtx} />
      </Template>
    );
  }
  element = element[0];
  console.log(element);

  function toggleSelectHandler() {
    if (itemIsSelected) {
      cartCtx.removeItem(id);
    } else {
      cartCtx.addItem({
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
  }

  return (
    <Template>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <Sale sale={element.sale} />
              <img
                className="card-img-top mb-5 mb-md-0"
                src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                alt="..."
              />
            </div>

            <div className="col-md-6">
              <div className="small mb-1">category: {element.category}</div>
              <h1 className="display-5 fw-bolder">{element.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">
                  {element.sale
                    ? "$" +
                      Math.round(
                        parseFloat(element.price) +
                          parseFloat(element.price) * 0.2
                      )
                    : null}
                </span>
                <span> ${element.price}</span>
              </div>
              <p className="lead">
                {element.full_description !== null &&
                element.full_description !== undefined
                  ? element.full_description
                  : element.description}
              </p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  onClick={toggleSelectHandler}
                >
                  <i className="bi-cart-fill me-1"></i>
                  {itemIsSelected ? "Remove from cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WriteReview />
      <Reviews></Reviews>
      <CardListRelated cards={cardCtx} />
    </Template>
  );
}

export default ItemPage;
