import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useState } from "react";

export function BarChartsStacked() {
  const [state, setState] = useState({
    series: [
      {
        name: "Atendidos",
        data: [0, 0, 0],
      },
      {
        name: "Vendidos",
        data: [0, 0, 0],
      },
      {
        name: "Não atendidos",
        data: [0, 0, 0],
      },
    ],
    options: {
        colors: ["rgb(254, 176, 25)", "rgb(0, 227, 150)" , "#e74c3c"],
        chart: {
            type: "bar",
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                            fontSize: "13px",
                            fontWeight: 900,
                        },
                    },
                },
            },
        },
        stroke: {
            width: 1,
            colors: ["#fff"],
        },
        title: {
            text: "Agendamentos",
        },
        xaxis: {
            categories: ["Londrina - PR", "Moema - SP", "Itapema - SC"],
            labels: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40,
        },
    } as unknown as ApexCharts.ApexOptions,
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </>
  );
}
