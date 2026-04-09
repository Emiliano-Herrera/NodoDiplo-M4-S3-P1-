import { useContext } from 'react';
import { CartContext } from './context/CartContext';
import { ThemeContext } from './context/ThemeContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ThemeButton from './components/ThemeButton';
import { FaShoppingCart } from 'react-icons/fa';

function App() {
  const { totalPrice } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-100'
    }`}>
      <header className={`sticky top-0 z-10 transition-colors ${
        theme === 'dark' 
          ? 'bg-black border-b border-gray-800' 
          : 'bg-white border-b border-gray-200 shadow-sm'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Carrito de compra con React
            </h1>
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full flex items-center gap-2 transition-colors ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
              }`}>
                <FaShoppingCart className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {totalItems} items - ${totalPrice}
                </span>
              </div>
              <ThemeButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <ProductList />
          <Cart />
        </div>
      </main>
    </div>
  );
}

export default App;