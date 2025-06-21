"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ backgroundColor, chartData, labels }) => {
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    borderColor: "#333",
  };

  return <Pie data={data} options={options} />;
};
