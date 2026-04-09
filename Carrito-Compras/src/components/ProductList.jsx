import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaLaptop, FaHeadphones, FaMouse, FaKeyboard, FaTv, FaMusic, FaCamera, FaHdd } from 'react-icons/fa';

// Lista de productos - AHORA con iconName
const products = [
  { id: 1, name: "Laptop", price: 1000, icon: FaLaptop, iconName: "FaLaptop", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200", color: "text-blue-400" },
  { id: 2, name: "Auriculares", price: 200, icon: FaHeadphones, iconName: "FaHeadphones", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944", color: "text-purple-400" },
  { id: 3, name: "Mouse", price: 50, icon: FaMouse, iconName: "FaMouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200", color: "text-green-400" },
  { id: 4, name: "Teclado", price: 80, icon: FaKeyboard, iconName: "FaKeyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200", color: "text-yellow-400" },
  { id: 5, name: "Monitor", price: 300, icon: FaTv, iconName: "FaTv", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200", color: "text-indigo-400" },
  { id: 6, name: "Parlante", price: 150, icon: FaMusic, iconName: "FaMusic", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200", color: "text-red-400" },
  { id: 7, name: "Webcam", price: 120, icon: FaCamera, iconName: "FaCamera", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=200", color: "text-pink-400" },
  { id: 8, name: "SSD 1TB", price: 180, icon: FaHdd, iconName: "FaHdd", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200", color: "text-cyan-400" }
];

function ProductList() {
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`rounded-lg p-6 border transition-colors ${
      theme === 'dark' 
        ? 'bg-black border-gray-800' 
        : 'bg-white border-gray-200 shadow-md'
    }`}>
      <h2 className={`text-xl font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>
        Productos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => {
          const IconComponent = product.icon;
          return (
            <div 
              key={product.id}
              className={`rounded-lg p-4 transition border ${
                theme === 'dark' 
                  ? 'bg-gray-900 hover:bg-gray-800 border-gray-800' 
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <IconComponent className={`text-2xl ${product.color}`} />
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {product.name}
                  </span>
                </div>
                <p className={`font-bold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  ${product.price}
                </p>
              </div>
              
              <button
                onClick={() => addToCart(product)}
                className={`w-full px-4 py-2 rounded-lg transition font-semibold ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Agregar al carrito
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;