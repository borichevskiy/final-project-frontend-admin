import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRolePage from "./app/admin/admin-role.page";
import AdminProductsPage from './app/admin/admin-products.page';
import AdminCategoriesPage from "./app/admin/admin-categories.page";
import AdminUsersPage from "./app/admin/admin-user.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/roles" element={<AdminRolePage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
