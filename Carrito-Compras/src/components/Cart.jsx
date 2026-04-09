import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { 
  FaTrash, FaPlus, FaMinus, FaTrashAlt,
  FaLaptop, FaHeadphones, FaMouse, FaKeyboard, 
  FaTv, FaMusic, FaCamera, FaHdd 
} from "react-icons/fa";

// Mapa de nombres de iconos a componentes reales
const iconMap = {
  FaLaptop: FaLaptop,
  FaHeadphones: FaHeadphones,
  FaMouse: FaMouse,
  FaKeyboard: FaKeyboard,
  FaTv: FaTv,
  FaMusic: FaMusic,
  FaCamera: FaCamera,
  FaHdd: FaHdd
};

function Cart() {
  // TRAEMOS DATOS Y FUNCIONES DEL CONTEXTO DEL CARRITO
  const { cart, removeFromCart, clearCart, updateQuantity, totalPrice } =
    useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  if (cart.length === 0) {
    return (
      <div
        className={`rounded-lg p-6 border transition-colors ${
          theme === "dark"
            ? "bg-black border-gray-800"
            : "bg-white border-gray-200 shadow-md"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Carrito
        </h2>
        <div className="text-center py-8">
          <p className={theme === "dark" ? "text-gray-500" : "text-gray-400"}>
            El carrito está vacío
          </p>
          <p
            className={`text-sm mt-1 ${theme === "dark" ? "text-gray-600" : "text-gray-500"}`}
          >
            Agregá productos para comenzar
          </p>
        </div>
      </div>
    );
  }

  // CALCULAR CANTIDAD TOTAL DE ITEMS (suma de todas las cantidades)
  // Ejemplo: si tengo 2 laptops (quantity=2) y 3 mouses (quantity=3), totalItems = 5
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`rounded-lg p-6 border transition-colors ${
        theme === "dark"
          ? "bg-black border-gray-800"
          : "bg-white border-gray-200 shadow-md"
      }`}
    >
      {/* Header con título y botón vaciar */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
        </h2>

        {/* BOTON PARA VACIAR EL CARRITO */}
        <button
          onClick={clearCart}
          className={`px-3 py-1 rounded-lg transition flex items-center gap-2 ${
            theme === "dark"
              ? "bg-red-900 hover:bg-red-800 text-red-300"
              : "bg-red-100 hover:bg-red-200 text-red-600"
          }`}
        >
          <FaTrashAlt size={14} />
          <span className="text-sm font-semibold">Vaciar todo</span>
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {cart.map((item) => {
          // Obtener el componente del icono desde el mapa
          const IconComponent = iconMap[item.iconName];
          
          return (
            <div
              key={item.id}
              className={`rounded-lg p-4 border transition-colors ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {IconComponent && <IconComponent className={`text-xl ${item.color}`} />}
                  <div>
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </span>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      ${item.price} c/u
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={
                    theme === "dark"
                      ? "text-gray-500 hover:text-red-400 transition"
                      : "text-gray-400 hover:text-red-500 transition"
                  }
                >
                  <FaTrash />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span
                    className={`font-semibold min-w-7.5 text-center ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                <p
                  className={`font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`border-t mt-4 pt-4 ${
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <span
            className={`font-bold text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Total:
          </span>
          <span
            className={`font-bold text-xl ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            ${totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;