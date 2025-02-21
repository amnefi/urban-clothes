import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

function Body() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado para carrito y favoritos
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/productos');
        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, []);

  // Lógica para BUY NOW
  const handleBuyNow = (producto) => {
    // 1) Agrega el producto al carrito
    // 2) Redirige a la página de Checkout, por ejemplo
    setCart((prevCart) => [...prevCart, { ...producto, cantidad: 1 }]);
    alert(`¡Compraste el producto: ${producto.nombre} en talla ${producto.tallaSeleccionada}!`);
    // Podrías hacer un redirect a /checkout
  };

  // Lógica para ADD TO CART
  const handleAddToCart = (producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((p) => p.nombre === producto.nombre && p.tallaSeleccionada === producto.tallaSeleccionada);
      if (existe) {
        // Si el producto existe, incrementa la cantidad
        return prevCart.map((p) =>
          p.nombre === producto.nombre && p.tallaSeleccionada === producto.tallaSeleccionada
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      // Si no existe, agrégalo con cantidad 1
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
    alert(`Agregado al carrito: ${producto.nombre} (talla: ${producto.tallaSeleccionada}).`);
  };

  // Lógica para ADD TO FAVORITES
  const handleAddToFavorites = (producto) => {
    setFavorites((prevFav) => {
      const existe = prevFav.find((f) => f.nombre === producto.nombre && f.tallaSeleccionada === producto.tallaSeleccionada);
      if (existe) {
        // Si ya está en favoritos, podrías quitarlo
        return prevFav.filter((f) => !(f.nombre === producto.nombre && f.tallaSeleccionada === producto.tallaSeleccionada));
      } else {
        // Si no está, lo agregas
        return [...prevFav, producto];
      }
    });
    alert(`¡Producto favorito: ${producto.nombre} (talla: ${producto.tallaSeleccionada})!`);
  };

  if (cargando) {
    return <p className="text-center mt-8">Cargando productos...</p>;
  }

  if (!productos.length) {
    return <p className="text-center mt-8">No hay productos disponibles.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            imagen={producto.imagen}
            stock={producto.stock !== false}
            tallas={producto.talla || []}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>

      {/* Ejemplo: Muestra el carrito y favoritos al final */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Carrito ({cart.length} items)</h3>
        <ul className="list-disc ml-5">
          {cart.map((item, index) => (
            <li key={index}>
              {item.nombre} - Talla: {item.tallaSeleccionada} - Cantidad: {item.cantidad}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6">Favoritos ({favorites.length} items)</h3>
        <ul className="list-disc ml-5">
          {favorites.map((item, index) => (
            <li key={index}>
              {item.nombre} - Talla: {item.tallaSeleccionada}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Body;
