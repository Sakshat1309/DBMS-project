import React, { useEffect, useState } from 'react'
import Axios from 'axios'; 
import "./AddProducts.css";

export const AddProducts = () => {
    const [ID,setID] = useState("");
    const [name,setName] = useState("");
    const [Price,setPrice] = useState("");
const [Quantity,setQuantity] = useState("");
const [Category,setCategory] = useState(1);
const [Supplier,setSupplier] = useState(1);
const [supplierID,setSupplierID] = useState("");
const [categoryID,setCategoryID] = useState("");
const [Image,setImage] = useState("");
const [tm,settm] = useState("");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var curr = new Date();
// var time ;
const getSupplier= () =>{
  Axios.get("http://localhost:3001/getSupplier").then((response) => {
     setSupplierID(response.data);
});
}
const getCategory= () =>{
  Axios.get("http://localhost:3001/getCategory").then((response) => {
     setCategoryID(response.data);
});
}

useEffect(() => {
  getSupplier();
  getCategory();
    settm(String(curr.getHours()) + ':' + String(curr.getMinutes()));
});


today = dd + '/' + mm + '/' + yyyy;

const submitOrder = () =>{
    // console.log(user,pass);
    console.log(Image);
    Axios.post('http://localhost:3001/AddProduct',
    {
     ID : ID,
     name : name,
     price: Price,
     quantity: Quantity,
     category: Category,
     Supplier: Supplier,
     Image: Image,
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
     ADD PRODUCT
       <form className='Addorderform'>
  <div class="form-group">
    <label for="exampleFormControlInput1">ID</label>
    <input onChange={(event)=>
                {
                  setID(event.target.value);
                }}type="number" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input onChange={(event)=>
                {
                  setName(event.target.value);
                }}type="text" class="form-control" id="exampleFormControlInput1" placeholder="eg. Rajma"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Price</label>
    <input onChange={(event)=>
                {
                  setPrice(event.target.value);
                }} type="number" class="form-control" id="exampleFormControlInput1" placeholder="eg. 200"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Quantity</label>
    <input onChange={(event)=>
                {
                  setQuantity(event.target.value);
                }}type="number" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Add Image Link</label>
    <input onChange={(event)=>
                {
                  setImage(event.target.value);
                }}type="text" class="form-control" id="exampleFormControlInput1" placeholder="eg. https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Category</label>
    <select onChange={(event)=>
                {
                  setCategory(event.target.value);
                }} class="form-control" id="exampleFormControlSelect1">
                 {
              categoryID &&
              categoryID.map((s, idx)=>{
                return(
                  <option key={idx}>{s.category_id}</option>
                  )
              })
            }
    </select>

  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Supplier</label>
    <select onChange={(event)=>
                {
                  setSupplier(event.target.value);
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
         <p>  New Product </p>
          <div className="inner">

          <div className="ID">NewProduct_id : {ID}</div>
          <div className="name"> Name : {name} </div>
          <div className="Price">Price : {Price}</div>
          <div className="Quantity">Quantity : {Quantity}</div>
          <div className="Category">Category : {Category}</div>
          <div className="total">Total Price : {parseInt(Price)*parseInt(Quantity)}</div>
          <div className="date">Image : {Image}</div>
          <div className="time">Time : {tm} </div>
          </div>
    <div className='buttonTag'>
             <button className='button-30' onClick={submitOrder}>SUBMIT ORDER</button>
    </div>
    </div>
    </div>
  )
}
