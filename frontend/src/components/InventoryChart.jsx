import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const InventoryChart = ({ vehicles }) => {
  const categoryMap = {};

  vehicles.forEach((vehicle) => {
    categoryMap[vehicle.category] =
      (categoryMap[vehicle.category] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Vehicles",
        data: Object.values(categoryMap),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const pieData = {
    labels: vehicles.map((v) => `${v.make} ${v.model}`),
    datasets: [
      {
        data: vehicles.map((v) => v.quantity),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#EC4899",
          "#84CC16",
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Vehicles by Category
        </h2>

        <Bar data={barData} />
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Stock Distribution
        </h2>

        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default InventoryChart;