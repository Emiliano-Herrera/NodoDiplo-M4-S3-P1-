import { createContext, useState, useEffect } from "react";

// 1. creamos el contexto (como un contenedor global)
export const CartContext = createContext();

// 2. Creamos el provider (el que va a dar los datos a toda la app)
export function CartProvider({ children }) {
  // 3. Estado del carrito...
  // arranca con lo q haya en el localStorage, o [] si está vacío
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 4. Guardar en local storage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); // cada vez que "cart" cambia, se guarda

  // 5. Funcion para agregar productos
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Buscar si el producto ya está en el carrito
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        // En caso de que ya exista, aumento la cantidad en 1
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // si no existe, lo agrego con cantidad 1
        // IMPORTANTE: guardamos el nombre del icono, no la función completa
        // porque las funciones no se pueden guardar en localStorage (DATAZO PAL FUTURO)
        return [...prevCart, { 
          ...product, 
          quantity: 1,
          iconName: product.iconName // guardamos SOLO el nombre del icono
        }];
      }
    });
  };

  // 6. funcion para eliminar un producto completo
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 7. funcion para vaciar el carrito por completo
  const clearCart = () => {
    setCart([]); // Vaciar el carrito completamente
  };

  // 8. funcion para cambiar la cantidad
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // no permitir cantidad menor a 1
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // 9. Calcular el total del carrito
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // 10. todo esto es lo que vamos a compartir con otros componentes (Objeto)
  const value = {
    cart, // lista de productos
    addToCart, // función para agregar
    removeFromCart, // función para eliminar UN producto
    clearCart, // función para ELIMINAR TODOS los productos
    updateQuantity, // función para cambiar cantidad
    totalPrice, // precio total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}