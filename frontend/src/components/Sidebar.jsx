import { Link, useLocation } from "react-router-dom";
import {
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      icon: <FaChartBar />,
      path: "/dashboard",
    },
  ];

  // Add Vehicle only for admin
  if (user?.role === "admin") {
    menu.push({
      name: "Add Vehicle",
      icon: <FaPlus />,
      path: "/vehicles/add",
    });
  }

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Car Inventory
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-10 flex items-center gap-3 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;