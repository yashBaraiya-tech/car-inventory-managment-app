import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="text-right">
        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>
    </header>
  );
};

export default Navbar;