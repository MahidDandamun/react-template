import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const MixedChartUI = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, {
      colors: ["#2160F9", "#ABC4FF", "#000000"],
      series: [
        {
          name: "Sales",
          type: "column",
          data: [231, 122, 63, 421, 122, 323, 111],
        },
        {
          name: "Inventory",
          type: "column",
          data: [232, 113, 341, 224, 522, 411, 243],
        },
        {
          name: "Inventory Turnover",
          type: "line",
          data: [123, 82, 235, 127, 143, 212, 217],
        },
      ],
      chart: {
        height: "520px",
        type: "line",
        fontFamily: "DM Sans, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: "Sales, Inventory and Inventory Turnover",
        style: {
          fontSize: "20px",
          fontWeight: "600",
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          bottom: -10,
        },
      },
      labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      yaxis: [
        {
          title: {
            text: "Stocks",
          },
        },
        {
          opposite: true,
          title: {
            text: "Inventory Turnover",
          },
        },
      ],
      fill: {
        opacity: 1,
      },
    });
    chart.render();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4 md:p-6">
      <div ref={chartRef} id="column-chart"></div>
    </div>
  );
};
export default MixedChartUI;
