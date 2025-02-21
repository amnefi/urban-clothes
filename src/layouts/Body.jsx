import { useState, useEffect, useCallback } from 'react';

const Body = () => {
  const [filtros, setFiltros] = useState({ talla: '', precio: '', categoria: '' });
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [carrito, setCarrito] = useState([]);
  const productosPorPagina = 8;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/productos');
        if (!respuesta.ok) throw new Error('Error al obtener productos');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error(error.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  const manejarCambioFiltro = (e) => {
    setFiltros((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const productosFiltrados = productos.filter(({ talla, categoria, precio }) => {
    return (
      (!filtros.talla || talla === filtros.talla) &&
      (!filtros.categoria || categoria === filtros.categoria) &&
      (!filtros.precio ||
        (filtros.precio === 'menor50' && precio < 50) ||
        (filtros.precio === 'entre50y100' && precio >= 50 && precio <= 100) ||
        (filtros.precio === 'mayor100' && precio > 100))
    );
  });

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const modificarCarrito = useCallback((producto, cantidad) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev
          .map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item))
          .filter((item) => item.cantidad > 0);
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  }, []);

  const totalCarrito = carrito.reduce((total, { precio, cantidad }) => total + precio * cantidad, 0);

  return (
    <main className="bg-white py-10 px-6">
      <section className="text-center mb-10">
        <h2 className="text-4xl font-bold text-pink-600">Bienvenido a Urban Clothes</h2>
        <p className="text-gray-700 mt-2">Explora nuestra colección de ropa moderna.</p>
      </section>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {['Talla', 'Categoría', 'Precio'].map((filtro) => (
          <select key={filtro} className="border rounded px-4 py-2" name={filtro.toLowerCase()} onChange={manejarCambioFiltro}>
            <option value="">Filtrar por {filtro}</option>
            {filtro === 'Talla' && ['XS', 'S', 'M', 'L', 'XL'].map((op) => <option key={op} value={op}>{op}</option>)}
            {filtro === 'Categoría' && ['Hombre', 'Mujer', 'Unisex'].map((op) => <option key={op} value={op}>{op}</option>)}
            {filtro === 'Precio' && ['menor50', 'entre50y100', 'mayor100'].map((op) => <option key={op} value={op}>{op.replace(/([a-z])([0-9]+)/, '$1 $2')}</option>)}
          </select>
        ))}
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cargando ? <p>Cargando productos...</p> : productosPaginados.length ? (
          productosPaginados.map((producto) => (
            <div key={producto.id} className="bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col">
              <img src={producto.imagen} alt={producto.nombre} className="h-40 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              <p className="text-gray-600">S/. {producto.precio.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Talla: {producto.talla}</p>
              <button onClick={() => modificarCarrito(producto, 1)} className="mt-auto bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                Agregar al Carrito
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button key={i + 1} onClick={() => setPaginaActual(i + 1)} className={`mx-1 px-4 py-2 rounded-lg ${paginaActual === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* Carrito */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-12">
        <h3 className="text-2xl font-semibold mb-4">🛒 Carrito</h3>
        {carrito.length ? carrito.map(({ id, nombre, precio, cantidad }) => (
          <div key={id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">{nombre}</p>
              <p className="text-sm text-gray-500">S/. {precio.toFixed(2)} x {cantidad}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => modificarCarrito({ id }, -1)} className="bg-gray-300 px-2 py-1 rounded">-</button>
              <span>{cantidad}</span>
              <button onClick={() => modificarCarrito({ id }, 1)} className="bg-gray-300 px-2 py-1 rounded">+</button>
            </div>
          </div>
        )) : <p className="text-gray-500">Tu carrito está vacío.</p>}
        <p className="text-lg font-semibold mt-4">Total: S/. {totalCarrito.toFixed(2)}</p>
      </div>
    </main>
  );
};

export default Body;
