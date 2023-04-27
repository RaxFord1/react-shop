import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ItemPage from "./pages/ItemPage";
import CartItemsContext, { CartItemsProvider } from "./store/CartItemsContext";
import DebugPage from "./pages/DebugPage";
import CategoryPage from "./pages/CategoryPage";
import FavouriteContext, {
  FavouriteItemsProvider,
} from "./store/FavoritesItemsContext";
import AdminPanel from "./pages/AdminPage";

function App() {
  const cartCtx = useContext(CartItemsContext);
  return (
    <FavouriteItemsProvider>
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
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/admin/" element={<AdminPanel />} />
        </Routes>
        <DebugPage />
      </CartItemsProvider>
    </FavouriteItemsProvider>
  );
}

export default App;
