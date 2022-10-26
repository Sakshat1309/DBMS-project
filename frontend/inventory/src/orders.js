import React, { useState,useEffect } from 'react'
import Sidebar from './sidebar'
import './orders.css'
import Axios from 'axios';

export default function orders() {

    const [order,setOrder] = useState("");

    const fetchOrders= () =>{
        Axios.get("http://localhost:3001/fetchOrders").then((response) => {
          setOrder(response.data);
      });
      }

      useEffect(() => {
         fetchOrders();
      });
  return (
    <>
    <div className="controller">
        <div className="left">
        <Sidebar/>
        </div>
        <div className="right-side">
            <div className='heading'>Orders</div>
  <table class="table">
  <thead class="table-dark">
    <tr>
      <th scope="col">Order ID</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Product ID</th>
      <th scope="col">Supplier ID</th>
    </tr>
  </thead>
  <tbody>
          { 
             order &&
              order.map((o, idx)=>{
                return(
                    <tr>
                    <th scope="row">{o.order_id}</th>
                    <td>{o.order_quantity}</td>
                    <td>{o.total_price}</td>
                    <td>{o.date}</td>
                    <td>{o.time}</td>
                    <td>{o.product_id}</td>
                    <td>{o.supplier_id}</td>
                  </tr>
                  )
              })
              }
  </tbody>
</table>
        </div>
    </div>
    </>
  )
}
