import React, { useState,useEffect } from "react";
import "./cards.css";
import Axios from "axios";

export default function cards() {
  const [oval, setoval] = useState(0);
  const getVal = () => {
    Axios.get("http://localhost:3001/value").then((response) => {

        setoval(response.data);
    });
  };
  useEffect(() => {
    getVal();
  });

  const [pval, setpval] = useState(0);
  const getPVal = () => {
    Axios.get("http://localhost:3001/Pvalue").then((response) => {

        setpval(response.data);
    });
  };
  useEffect(() => {
    getPVal();
  });
  
  return (
    <>
      <div className="cards_c">
        <div className="products_card">TOTAL PRODUCTS : {pval}</div>
        <div className="orders_card">TOTAL ORDERS : {oval}</div>
      </div>
    </>
  );
}
