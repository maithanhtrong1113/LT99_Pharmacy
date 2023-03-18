import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Số lượng nhập",
      data: ["3", "6", "9"],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Số lượng tồn",
      data: ["3", "6", "9"],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Số lượng xuất",
      data: ["3", "6", "9"],
      backgroundColor: "rgb(233, 233, 110,0.5)",
    },
  ],
};

const test = () => {
  return (
    <div className="container">
      <Bar options={options} data={data} height={400} />
    </div>
  );
};

export default test;
