
import Badge from "./Badge";

function Cart(props) {
  return (
    <form className="d-flex">
      <button className="btn btn-outline-dark" type="submit">
        <i className="bi-cart-fill me-1"></i>
        Cart
        <Badge value={props.counter} />
      </button>
    </form>
  );
}

export default Cart;
