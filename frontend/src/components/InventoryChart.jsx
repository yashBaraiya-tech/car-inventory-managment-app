import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#0891b2",
];

const InventoryChart = ({ vehicles }) => {
  const categoryData = Object.values(
    vehicles.reduce((acc, vehicle) => {
      if (!acc[vehicle.category]) {
        acc[vehicle.category] = {
          category: vehicle.category,
          count: 0,
        };
      }

      // total stock by category
      acc[vehicle.category].count += vehicle.quantity;

      return acc;
    }, {})
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

      {/* Vehicles by Category */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-5">
          Vehicles by Category
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              name="Stock"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>


      {/* Stock Distribution */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-5">
          Stock Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="category"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default InventoryChart;