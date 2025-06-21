"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Legend,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Legend,
  LineElement
);

export const LineChart = ({ borderColor, data, labels, label }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line data={chartData} options={options} />;
};
