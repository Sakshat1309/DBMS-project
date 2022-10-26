import React from 'react'
import { useState } from 'react';
import './login.css';
import Alert from 'react-popup-alert'
import "react-popup-alert/dist/index.css";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function login() {
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })
  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert(type , text) {
    setAlert({
      type: type,
      text: text,
      show: true
    })
  }
  // const displayInfo = () =>{
  //   console.log(user + " : " + pass)
  // }
  const func = () =>{
    onShowAlert('success','login success')
  };
  const func1 = () =>{
    onShowAlert('error','Invalid Credentials')
  };
  const Auth = () =>{
    // console.log(user,pass);
    Axios.post('http://localhost:3001/check',
    {
     user: user,
     pass : pass,
    }).then((response) =>{
        if(response.data === 1){
          console.log("Login success");
          func();
            console.log("Navigating");
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
        }
        else{
          console.log(" Login failure");
          func1();
        }
    });
  };
  // const getAuth = () => {
  //   Axios.get("http://localhost:3001/check").then((response) => {
  //     console.log(response);
  //     setFlag(response.data);
  //   });
  // };

  return (
    <>
     
      <div className="main-container">
      <section className="vh-200 gradient-custom">
      <div className="container py-5 h-200">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: `1rem`}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 ">LogIn</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-7">
                <label className="form-label" htmlFor="typeEmailX" style={{color: `white` , textAlign: `left` , display: `flex` , justifyContent: `left`}}>Email</label>
                <input type="text" onChange={(event)=>
                {
                  setUser(event.target.value);
                }}  id="typeEmailX" className="form-control form-control-lg" style={{backgroundColor: `white`,color: `black`}} />
              </div>

              <div className="form-outline form-white mb-7">
               <label className="form-label" htmlFor="typePasswordX" style={{color: `white` , textAlign: `left` , display: `flex` , justifyContent: `left`}}>Password</label>
                <input type="password" onChange={(event)=>
                {
                  setPass(event.target.value);
                }} id="typePasswordX" className="form-control form-control-lg" style={{backgroundColor: `white` , color: `black`}}/>
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

              <button onClick={Auth}  className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section>

      <Alert
        header={'Message From Team CodeX'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
</section>
      </div>
  
   
    </>
  )
}

