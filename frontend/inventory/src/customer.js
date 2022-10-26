import React, {useState,useEffect} from 'react'
import Sidebar from './sidebar'
import Axios from 'axios';
export default function customer() {

    const [customer,setCustomer] = useState("");

    const fetchCustomers= () =>{
        Axios.get("http://localhost:3001/fetchCustomers").then((response) => {
          setCustomer(response.data);
      });
      }

      useEffect(() => {
         fetchCustomers();
      });
  return (
    <>
    <div className="controller">
        <div className="left">
               <Sidebar/>
        </div>
        <div className="right-side">
            <div className='heading'>Customer Details</div>
  <table class="table">
  <thead class="table-dark">
    <tr>
      <th scope="col">Customer Name</th>
      <th scope="col">Phone number</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
          { 
             customer &&
              customer.map((c, idx)=>{
                return(
                    <tr>
                    <th scope="row">{c.customer_name}</th>
                    <td>{c.Phone_no}</td>
                    <td>{c.age}</td>
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
