import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import ItemPage from "./pages/ItemPage";
import CartItemsContext, { CartItemsProvider } from "./store/CartItemsContext";

function App() {
  const cartCtx = useContext(CartItemsContext);
  return (
    <CartItemsProvider>
      <Routes>
        <Route
          path="/"
          element={
            <IndexPage
              selectedItems={cartCtx.selectedItems}
              totalSelectedItems={cartCtx.totalSelectedItems}
            />
          }
        />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </CartItemsProvider>
  );
}

export default App;
