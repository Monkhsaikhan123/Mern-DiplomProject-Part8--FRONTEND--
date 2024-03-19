import React, { Fragment, useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";

const DonatsChart = () => {
  const [recipes, setRecipes] = useState([])
  useEffect(()=>{
      fetch('http://localhost:3000/menu')
      .then(res => res.json())
      .then(data => {const specials = data.filter((item)=> item.category === "Хүнсний ногоо")
      console.log(specials)
      setRecipes(specials)
  })
  
  },[])
  

  function getData() {
    return [
      {
        quarter: "Q1",
        petrol: 200,
        diesel: 100,
      },
      {
        quarter: "Q2",
        petrol: 300,
        diesel: 130,
      },
      {
        quarter: "Q3",
        petrol: 350,
        diesel: 160,
      },
      {
        quarter: "Q4",
        petrol: 400,
        diesel: 200,
      },
    ];
  }
  const [options, setOptions] = useState({
    title: {
      text: "Product and Items",
    },
    data: getData(),
    series: [
      {
        type: "line",
        xKey: "quarter",
        yKey: "petrol",
        yName: "Items",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "diesel",
        yName: "Vegetables",
      },
    ],
  });
  return (
    <AgChartsReact options={options} />
  )
}

export default DonatsChart