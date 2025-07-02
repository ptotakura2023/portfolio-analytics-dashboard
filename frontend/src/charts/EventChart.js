import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventChart = ({ events }) => {
  // Example: Group events by day and count
  const groupedData = events.reduce((acc, event) => {
    const date = new Date(event.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const data = {
    labels,
    datasets: [
      {
        label: "Events per Day",
        data: Object.values(groupedData),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <Bar options={{ responsive: true }} data={data} />
    </div>
  );
};

export default EventChart; 