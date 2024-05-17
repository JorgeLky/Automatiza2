import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useState } from "react";

export function ColumnChartBasic() {
  const [state, setState] = useState({
    series: [
      {
        name: "Realizado",
        data: [0, 0, 0],
      },
      {
        name: "Meta",
        data: [0, 0, 0],
      },
      {
        name: "Tendencia",
        data: [0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Londrina - PR", "Moema - SP", "Itapema - SC"],
      },
      yaxis: {
        title: {
          text: "R$ Valor",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "R$ " + val;
          },
        },
      },
    } as unknown as ApexCharts.ApexOptions,
  });

  return (
    <>
      <h3>Faturamento x Meta</h3>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </>
  );
}
