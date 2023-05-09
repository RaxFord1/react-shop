import { useContext } from "react";
import CartItemsContext from "../store/CartItemsContext";

function Badge() {
  const cartCtx = useContext(CartItemsContext);
  return <span className="badge bg-dark text-white ms-1 rounded-pill">
    {cartCtx.totalSelectedItems}
  </span>;
}
export default Badge;

