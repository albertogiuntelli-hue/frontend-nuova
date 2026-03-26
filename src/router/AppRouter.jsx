import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Promo from "../pages/Promo";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import Categories from "../pages/Categories";
import UploadCSV from "../pages/UploadCSV";

import Login from "../pages/Login";
import Shop from "../pages/Shop";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccess from "../pages/OrderSuccess";

export default function AppRouter() {
    return (
        <Router>
            <Routes>

                {/* LOGIN */}
                <Route path="/" element={<Login />} />

                {/* REDIRECT /dashboard → /admin */}
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

                {/* ADMIN AREA */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="promo" element={<Promo />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="upload" element={<UploadCSV />} />
                </Route>

                {/* SHOP AREA */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccess />} />

                {/* CATCH-ALL: se la route non esiste → login */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </Router>
    );
}
