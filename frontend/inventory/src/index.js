import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Dashboard from './dashboard';
import { AddOrders } from './AddOrders';
import { AddProducts } from './AddProducts';
import Order from './orders';
import Customer from './customer';
import AddCustomers from './AddCustomers';
import  Product  from './Product';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/Orders" element={<Order />} />
        <Route path="dashboard/Customers" element={<Customer />} />
        <Route path="dashboard/AddOrder" element={<AddOrders />} />
        <Route path="dashboard/AddCustomers" element={<AddCustomers />} />
        <Route path="dashboard/AddProducts" element={<AddProducts />} />
        <Route path="dashboard/Products" element={<Product />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
