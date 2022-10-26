
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";
import { useState,useEffect } from "react";
import Axios from "axios";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function barchart() {

  const [oval, setoval] = useState();
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

  const [sval, setsval] = useState(0);
  const getSVal = () => {
    Axios.get("http://localhost:3001/Svalue").then((response) => {

        setsval(response.data);
    });
  };
  useEffect(() => {
    getSVal();
  });

  const [cval, setcval] = useState(0);
  const getCVal = () => {
    Axios.get("http://localhost:3001/Cvalue").then((response) => {

        setcval(response.data);
    });
  };
  useEffect(() => {
    getCVal();
  });


  const labels = [
    "Values",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Products",
        data: [pval],
        // backgroundColor: "rgba(255, 109, 132, 0.8)",
        backgroundColor: "rgba(255,53,53,0.8)",
      },
      {
        label: "Customers",
        data: [cval],
        backgroundColor: "rgba(221, 54, 192, 0.8)",
      },
      {
        label: "Suppliers",
        data: [sval],
        backgroundColor: "rgba(246,202,70,0.8)",
      },
      {
        label: "Orders",
        data: [oval],
        backgroundColor: "rgba(93,194,243, 0.8)",
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Orders Chart",
      },
    },
  };

  return (
    <>
      <div>
        <Bar options={options} data={data} height={500} width={800} />
      </div>
    </>
  );
}
