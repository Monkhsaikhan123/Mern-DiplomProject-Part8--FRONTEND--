import React, { Fragment, useState } from "react";
import { AgChartsReact } from "ag-charts-react";

const PieChart = () => {
    function getData() {
        return [
          { asset: "Хүнсний ногоо", amount: 60000 },
          { asset: "Хүлэмжний ногоо", amount: 40000 },
          { asset: "Нарийн ногоо", amount: 7000 },
          { asset: "Навчит ногоо", amount: 5000 },
        ];
      }
    const [options, setOptions] = useState({
        data: getData(),
        title: {
          text: "Portfolio Composition",
        },
        series: [
          {
            type: "pie",
            angleKey: "amount",
            legendItemKey: "asset",
          },
        ],
      });
  return (
    <AgChartsReact options={options} />
  )
}

export default PieChart