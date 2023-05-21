import { NavLink } from "react-router-dom";
import Badge from "./Badge";

function Cart() {
  return (
    <NavLink className="nav-link active" to="/cart">
      <button className="btn btn-outline-dark" type="submit">
        <i className="bi-cart-fill me-1"></i>
        Cart
        <Badge />
      </button>
    </NavLink>
  );
}

export default Cart;
