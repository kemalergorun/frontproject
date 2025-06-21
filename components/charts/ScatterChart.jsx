"use client";

import {
  Chart as ChartJs,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJs.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const ScatterChart = ({
  backgroundColor,
  data,
  label,
  xLabel,
  yLabel,
}) => {
  const chartData = {
    datasets: [
      {
        data,
        label,
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: xLabel,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return <Scatter data={chartData} options={options} />;
};
