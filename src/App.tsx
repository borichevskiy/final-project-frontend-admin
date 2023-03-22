import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import AdminRolePage from "./app/admin/roles/admin-role.page";
import AdminCategoriesPage from "./app/admin/categories/admin-categories.page";
import AdminUsersPage from "./app/admin/users/admin-user.page";
import AdminSettingsPage from "./app/admin/settings/admin-settings.page";
import AdminProductsPage from "./app/admin/products/admin-products.page";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/roles" element={<AdminRolePage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
