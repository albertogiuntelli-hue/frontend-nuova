import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Promo from "../pages/Promo";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import Categories from "../pages/Categories";
import OrdersArchive from "../pages/OrdersArchive";
import CaricaCSV from "../pages/CaricaCSV";

import Login from "../pages/Login";
import Shop from "../pages/Shop";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccess from "../pages/OrderSuccess";

export default function AppRouter() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="promo" element={<Promo />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/archive" element={<OrdersArchive />} />
                    <Route path="users" element={<Users />} />
                    <Route path="categories" element={<Categories />} />

                    <Route path="carica-csv" element={<CaricaCSV />} />
                </Route>

                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccess />} />

                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </Router>
    );
}
