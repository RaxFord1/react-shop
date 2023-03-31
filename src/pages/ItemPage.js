import React, { useContext, useEffect, useMemo, useState } from "react";
import Template from "../layout/Template";
import { CardsListData } from "./IndexPage";
import CardListRelated from "../components/CardListRelated";
import Sale from "../components/Sale";
import { useParams } from "react-router-dom";
import Reviews from "../layout/Reviews";
import WriteReview from "../components/WriteReview";
import Currency from "../components/Currency";
import CartItemsContext from "../store/CartItemsContext";

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    function handleResize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

function useFullName(firstName, lastName) {
  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
  return fullName;
}

function ItemPage(props) {
  const cartCtx = useContext(CartItemsContext);

  const { id } = useParams();
  const { count, increment, decrement } = useCounter();
  const [width, height] = useWindowSize();

  var firstName = "Dima";
  var lastName = "Dzundza"
  const fullName = useFullName(firstName, lastName);

  const itemIsSelected = cartCtx.isSelected(id);

  useEffect(() => {
    console.log(`АПЧХІ! Це буде виконано лише один раз!`);
  }, []);

  useEffect(() => {
    document.title = `Значення: ${count}`;

    return () => {
      document.title = "Rimuru Shop";
    };
  }, [count]);

  var element = CardsListData.filter((item) => item.id === id);

  if (element.length === 0) {
    return (
      <Template>
        <section className="py-5">Item not found</section>
        <CardListRelated cards={CardsListData} />
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
    <Template
      selected_counter={
        cartCtx.totalSelectedItems ? cartCtx.totalSelectedItems : 0
      }
    >
      <div>
        <p>Значення: {count}</p>
        <button onClick={increment}>Збільшити</button>
        <button onClick={decrement}>Зменшити</button>
      </div>
      <div>
        <p>Ширина: {width}px Висота: {height}px</p>
      </div>
      <div>
      <p>Ім'я: {firstName} Прізвище: {lastName} Повне ім'я: {fullName}</p>
    </div>
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
              <Currency value={element.price} />
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
      <CardListRelated cards={CardsListData} />
    </Template>
  );
}

export default ItemPage;
