import React, { useEffect, useState } from 'react'
import Axios from 'axios'; 
import "./AddOrders.css";

export const AddOrders = () => {
     const [data,setData] = useState();
    const [ID,setID] = useState("1");
    const [name,setName] = useState("");
    const [supID,setSupID] = useState("1");
    const [supplierID,setSupplierID] = useState("");
    const [Price,setPrice] = useState("");
const [Quantity,setQuantity] = useState("1");
const [Category,setCategory] = useState("");
const [tm,settm] = useState("");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var curr = new Date();
const [products,setProduct] = useState(data);
// var time ;

useEffect(() => {
    settm(String(curr.getHours()) + ':' + String(curr.getMinutes()));
});

today = dd + '/' + mm + '/' + yyyy;

const getProduct= () =>{
  Axios.get("http://localhost:3001/getProducts").then((response) => {
    setData(response.data);
    setProduct(response.data);
});
}
const getSupplier= () =>{
  Axios.get("http://localhost:3001/getSupplier").then((response) => {
     setSupplierID(response.data);
});
}
useEffect(() => {
  getSupplier();
  getProduct();
  getPrice();
});
const getPrice= () =>{
  Axios.post("http://localhost:3001/getPrice",{
    id : ID,
  }).then((response) => {
    setName(response.data[0].Product_name);
  setPrice(response.data[0].Price_p_unit);
  setCategory(response.data[0].Category_name);
});
}

const submitOrder = () =>{
    // console.log(user,pass);
    Axios.post('http://localhost:3001/AddOrder',
    {
     id : ID,
     quantity: Quantity,
     TotalPrice : parseInt(Price)*parseInt(Quantity),
     date : today,
     time : tm,
     supID : supID,
    }).then((response) =>{
        if(response.data === 1){
           console.log("successfully inserted")
        }
        else{
          console.log("error in inserting");
        }
    });
  };
  return (
    <div className='Container'>
<div className='details'>
     ADD ORDER
       <form className='Addorderform'> 
   <div class="form-group">
    <label for="exampleFormControlSelect1">Product ID</label>
    <select onChange={(event)=>
                {
                  setID(event.target.value);
                }} class="form-control" id="exampleFormControlSelect1">
            {
              products &&
              products.map((p, idx)=>{
                return(
                  <option key={idx}>{p.product_id}</option>
                  )
              })
            }
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Quantity</label>
    <input onChange={(event)=>
                {
                  setQuantity(event.target.value);
                }}type="number" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Supplier ID</label>
    <select onChange={(event)=>
                {
                  setSupID(event.target.value);
                }} class="form-control" id="exampleFormControlSelect1">
            {
              supplierID &&
              supplierID.map((s, idx)=>{
                return(
                  <option key={idx}>{s.supplier_id}</option>
                  )
              })
            }
    </select>
  </div>
</form>
</div>

    <div className='ShowFinalOrder'>
         <p> Final Order </p>
          <div className="inner">

          <div className="id"> Product_id : {ID} </div>
          <div className="name">Name: {name}</div>
          <div className="Price">Price : {Price}</div>
          <div className="Quantity">Quantity : {Quantity}</div>
          <div className="Category">Category : {Category}</div>
          <div className="total">Total Price : {parseInt(Price)*parseInt(Quantity)}</div>
          <div className="supplier">Supplier_id : {supID}</div>
          <div className="date">Date : {today}</div>
          <div className="time">Time : {tm} </div>
          </div>
    <div className='buttonTag'>
             <button className='button-30' onClick={submitOrder}>SUBMIT ORDER</button>
    </div>
    </div>
    </div>
  )
}
