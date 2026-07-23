import {
  FaEdit,
  FaTrash,
  FaShoppingCart,
  FaBoxes,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const VehicleTable = ({
  vehicles,
  user,
  onDelete,
  onPurchase,
  onRestock,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3 text-left">Make</th>
            <th className="px-4 py-3 text-left">Model</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-center">Stock</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                {vehicle.image ? (
                  <img
                    src={`${API_URL}${vehicle.image}`}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-20 h-14 object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-14 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </td>

              <td className="px-4 py-3">{vehicle.make}</td>

              <td className="px-4 py-3">{vehicle.model}</td>

              <td className="px-4 py-3">{vehicle.category}</td>

              <td className="px-4 py-3">
                ${Number(vehicle.price).toLocaleString()}
              </td>

              <td className="px-4 py-3 text-center">
                {vehicle.quantity}
              </td>

              <td className="px-4 py-3 text-center">
                {vehicle.quantity === 0 ? (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Out of Stock
                  </span>
                ) : vehicle.quantity < 5 ? (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Low Stock
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    In Stock
                  </span>
                )}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">


                  <button
                    onClick={() => onPurchase(vehicle._id)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                  >
                    <FaShoppingCart />
                  </button>

                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => onEdit(vehicle._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                      >
                        <FaEdit />
                      </button>
                      
                      <button
                        onClick={() => onRestock(vehicle._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                      >
                        <FaBoxes />
                      </button>

                      <button
                        onClick={() => onDelete(vehicle._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;