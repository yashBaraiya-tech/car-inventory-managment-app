import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Vehicles from "./Vehicles";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Welcome {user?.name}</h2>
          <p>Role: {user?.role}</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <hr />

      <Link to="/vehicles/add">
        <button>Add Vehicle</button>
      </Link>

      <br />
      <br />

      <Vehicles />
    </div>
  );
};

export default Dashboard;