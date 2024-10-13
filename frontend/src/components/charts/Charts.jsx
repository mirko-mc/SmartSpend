import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Charts = ({ TotalIn, TotalOut }) => {
  const data = {
    labels: ["Entrate", "Uscite"],
    datasets: [
      {
        label: "Percentuali",
        data: [TotalIn, TotalOut],
        backgroundColor: ["rgba(0, 128, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
        borderColor: ["rgba(0, 128, 0, 1)", "rgba(255, 0, 0, 1)"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Percentuali entrate e uscite",
      },
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "EUR",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};
