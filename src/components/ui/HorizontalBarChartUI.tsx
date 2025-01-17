import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const HorizontalBarChartUI = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, {
      series: [
        {
          name: 'Starting count',
          color: '#31C48D',
          data: ['1420', '1620', '1820', '1420', '1650', '2120'],
        },
        {
          name: 'Used stocks',
          data: ['788', '810', '866', '788', '1100', '1200'],
          color: '#F05252',
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: 'bar',
        height: '460px',
        fontFamily: 'DM Sans, sans-serif',
        toolbar: {
          show: false,
        },
      },
      title: {
        text: 'Inventory value per item',
        style: {
          fontSize: '20px',
          fontWeight: '600',
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '100%',
          borderRadius: 4,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'top',
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        markers: {
          shape: 'circle',
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
            type: 'darken',
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
      xaxis: {
        categories: ['Item 5', 'Item 4', 'Item 3', 'Item 2', 'Item 1'],
        title: {
          text: 'Stocks',
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
    });
    chart.render();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div ref={chartRef} id="column-chart"></div>
    </div>
  );
};

export default HorizontalBarChartUI;
