import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ItemPage from "./pages/ItemPage";
import DebugPage from "./pages/DebugPage";
import CategoryPage from "./pages/CategoryPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import AllContextsWrapper from "./store/AllContextsWrapper";

function App() {
  return (
    <AllContextsWrapper>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin/" element={<AdminPage />} />
        <Route path="/login/" element={<LoginPage />} />
      </Routes>
      <DebugPage />
    </AllContextsWrapper>
  );
}

export default App;
