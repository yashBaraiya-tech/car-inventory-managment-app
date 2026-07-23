import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Vehicles from "./Vehicles";
import StatCard from "../components/StatCard";
import { getVehicles } from "../services/vehicle.service";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalStock: 0,
    inventoryValue: 0,
    lowStock: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getVehicles();
      const vehicles = res.data;

      const totalVehicles = vehicles.length;

      const totalStock = vehicles.reduce(
        (sum, vehicle) => sum + vehicle.quantity,
        0
      );

      const inventoryValue = vehicles.reduce(
        (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
        0
      );

      const lowStock = vehicles.filter(
        (vehicle) => vehicle.quantity < 5
      ).length;

      setStats({
        totalVehicles,
        totalStock,
        inventoryValue,
        lowStock,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          color="#2563eb"
        />

        <StatCard
          title="Total Stock"
          value={stats.totalStock}
          color="#16a34a"
        />

        <StatCard
          title="Inventory Value"
          value={`$${stats.inventoryValue.toLocaleString()}`}
          color="#ca8a04"
        />

        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          color="#dc2626"
        />
      </div>

      <Vehicles />
    </DashboardLayout>
  );
};

export default Dashboard;