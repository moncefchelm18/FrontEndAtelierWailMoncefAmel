import './CSS/page.css';
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import DashboardAdmin from "../../components/AdminComponents/DashboardAdmin";
const Admin = (props) => {
    return (
        <div className="app-container">
            <VerticalMenu displayAdminMenu={true} />
            <div className="main-container">
                <Header />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default Admin;