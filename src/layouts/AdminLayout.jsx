import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Header />

            <div className="admin-body">
                <Sidebar />

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
