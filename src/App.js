import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ItemPage from "./pages/ItemPage";
import DebugPage from "./pages/DebugPage";
import CategoryPage from "./pages/CategoryPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import AllContextsWrapper from "./store/AllContextsWrapper";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import { ReviewsItemsProvider } from "./store/ReviewsContext";
import ReduxPage from "./pages/ReduxPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <AllContextsWrapper>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route
          path="/item/:id"
          element={
            <ReviewsItemsProvider>
              <ItemPage />
            </ReviewsItemsProvider>
          }
        />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/redux"
          element={
            <Provider store={store}>
              <ReduxPage />
            </Provider>
          }
        />
      </Routes>
      <DebugPage />
    </AllContextsWrapper>
  );
}

export default App;
