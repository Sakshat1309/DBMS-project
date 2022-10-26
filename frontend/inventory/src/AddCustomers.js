import React ,{useState} from 'react'
import Axios from 'axios';

export default function AddCustomers() {
    const [customer,setCustomer] = useState("");
    const [Phone,setPhone] = useState("");
    const [Age,setAge] = useState("");

    const submitCustomer= ()=>{
        Axios.post('http://localhost:3001/AddCustomer',
        {
         customer:customer,
         Phone: Phone,
         Age: Age,
        }).then((response) =>{
            if(response.data === 1){
               console.log("successfully inserted")
            }
            else{
              console.log("error in inserting");
            }
        });
    }

  return (
   <>
      <div className="Container">
      <div className='details'>
     ADD Customers
       <form className='Addorderform'> 
  <div class="form-group">
    <label for="exampleFormControlInput1">Customer Name</label>
    <input onChange={(event)=>
                {
                  setCustomer(event.target.value);
                }}type="Text" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Phone Number</label>
    <input onChange={(event)=>
                {
                  setPhone(event.target.value);
                }}type="Number" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Age</label>
    <input onChange={(event)=>
                {
                  setAge(event.target.value);
                }}type="Number" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1" required/>
  </div>
  
</form>
</div>

    <div className='ShowFinalOrder'>
         <p> Final Order </p>
          <div className="inner">

          <div className="name">Name: {customer}</div>
          <div className="Phone">Phone Number: {Phone}</div>
          <div className="Age">Age: {Age}</div>

          </div>
    <div className='buttonTag'>
             <button className='button-30' onClick={submitCustomer}>Add Customer</button>
    </div>
    </div>
      </div>
   </>
  )
}
