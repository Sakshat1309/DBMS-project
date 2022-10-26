import React, { useState , useEffect } from 'react';
import Sidebar from './sidebar.js';
import Axios from 'axios';
import './product.css';
import Modal from 'react-modal';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

export default function Product() {
   
    const [product,setProduct] = useState("");
    const [ID,setID] = useState();
    const [NewQuant,setNewQuant] = useState();
    const [NewPrice,setNewPrice] = useState();

    const fetchProduct= () =>{
        Axios.get("http://localhost:3001/fetchProducts").then((response) => {
          setProduct(response.data);
      });
      }

      useEffect(() => {
         fetchProduct();
      });
  //  updating the products in database

      const updateProducts= () =>{
        Axios.post('http://localhost:3001/updateProducts',
    {
     ID:ID,
     NewQuant:NewQuant,
     NewPrice: NewPrice,
    }).then((response) =>{
         console.log(response.data);
    });
      }
     
      const delProduct= (id) =>{
        Axios.post('http://localhost:3001/deleteProducts',
        {
         id,
        }).then((response) =>{
             console.log(response.data);
        });
      }
      // adding the modal
      let subtitle;
      const [modalIsOpen, setIsOpen] = React.useState(false);
    
      function openModal(id) {
        setID(id);
        setIsOpen(true);
      }
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }
     
  return (
   <>
   <div className="controller">
    <div className="left">
        <Sidebar/>
    </div>
    <div className="right">
    {
              product &&
              product.map((p, idx)=>{
                return(
                    <div class="card" style={{width: `18rem`}}>
                    <img className='card-img' src= {p.image} class="card-img-top" alt='img'/>
                    <div class="card-body">
                      <h4 class="card-title">{p.product_name}</h4>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Product_id: {p.product_id} </li>
                      <li class="list-group-item">Quantity: {p.product_quantity}</li>
                      <li class="list-group-item">Price Per Unit: {p.price_p_unit} </li>
                      <li class="list-group-item">Supplier id : {p.supplier_id}</li>
                      <li class="list-group-item">Category name : {p.category_name}</li>
                    </ul>
                    <div class="card-body">
                    <button type="button" class="btn btn-success" onClick={()=>openModal(p.product_id)}>Edit</button>
                      <button type="button" class="btn btn-danger" onClick={()=>{
                        delProduct(p.product_id);
                        console.log("Pid is : " + p.product_id);
                      }}>Delete</button>
                    </div>
                    </div>
                  )
              })
            }
    </div>
   </div>
   <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid black',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '100px',
            left: '500px',
            right: '600px',
            bottom: '400px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}> </h2>
        <h2 style={{color : `black`}}>Edit the product</h2>
        
        <form>
          <h4>New quantity</h4>
          <input type="number" onChange={(event)=>
                {
                  setNewQuant(event.target.value);
                }}/>
          <h4>New Price per unit</h4>
          <input type="number" onChange={(event)=>
                {
                  setNewPrice(event.target.value);
                }} />
        </form>
        <button type="button" class="btn btn-success" onClick={updateProducts} >Submit</button>
        <button type="button" class="btn btn-danger" onClick={closeModal}>close</button>
      </Modal>
   </>
  )
}
