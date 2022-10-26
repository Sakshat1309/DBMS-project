import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function sidebar() {
  return (
    <>
      <div id="sidebar">
        <header>
          <Link to="/dashboard">Dashboard</Link>
        </header>
        <div className="imag">
          <img src="/icons8-department-shop-100.png" alt="img" />
        </div>
        <ul className="nav">
          <li>
            <Link to="/dashboard/Products">
              <i className="zmdi zmdi-view-dashboard"></i> Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard/Orders">
              <i className="zmdi zmdi-link"></i> MyOrders
            </Link>
          </li>
          <li>
            <Link to="/dashboard/Customers">
              <i className="zmdi zmdi-link"></i> Customers
            </Link>
          </li>

          <li>
            <Link to="/dashboard/AddOrder">
              <i className="zmdi zmdi-calendar"></i> Add Order
            </Link>
          </li>
          <li>
            <Link to="/dashboard/AddProducts">
              <i className="zmdi zmdi-info-outline"></i> Add Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard/AddCustomers">
              <i className="zmdi zmdi-info-outline"></i> Add Customers
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
