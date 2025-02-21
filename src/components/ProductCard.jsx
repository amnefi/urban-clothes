import { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({
  nombre,
  precio,
  imagen,
  stock,
  tallas,
  onBuyNow,
  onAddToCart,
  onAddToFavorites
}) {
  // Estado local para la talla seleccionada
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');

  const handleSelectTalla = (talla) => {
    setTallaSeleccionada(talla);
  };

  return (
    <div className="max-w-sm border border-gray-200 rounded-md overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      {/* Imagen del producto */}
      <img
        src={
          imagen?.startsWith('http')
            ? imagen
            : `http://localhost:3000${imagen}`
        }
        alt={nombre}
        className="w-full h-48 object-cover"
      />

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Título y precio */}
        <h2 className="text-xl font-bold mb-1">{nombre}</h2>
        <p className="text-gray-600">
          S/. {precio.toFixed(2)}{' '}
          <span className={`ml-1 ${stock ? 'text-green-600' : 'text-red-600'}`}>
            {stock ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>
        </p>

        {/* Sección de tallas */}
        <div className="flex items-center gap-2 my-4">
          {tallas?.map((talla) => (
            <button
              key={talla}
              onClick={() => handleSelectTalla(talla)}
              className={`
                px-3 py-1 border rounded transition
                ${
                  tallaSeleccionada === talla
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                }
              `}
            >
              {talla}
            </button>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2">
          {/* BUY NOW */}
          <button
            onClick={() => onBuyNow({ nombre, precio, tallaSeleccionada })}
            className="flex-1 bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
          >
            Buy Now
          </button>

          {/* ADD TO CART */}
          <button
            onClick={() => onAddToCart({ nombre, precio, tallaSeleccionada })}
            className="flex-1 border border-teal-500 text-teal-500 py-2 rounded hover:bg-teal-100 transition"
          >
            Add to Bag
          </button>

          {/* FAVORITOS (Wishlist) */}
          <button
            onClick={() => onAddToFavorites({ nombre, precio, tallaSeleccionada })}
            className="text-gray-500 hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 
                   016.364 0L12 
                   7.657l1.318-1.339a4.5 4.5 0 
                   016.364 6.364l-7.07 7.07a.75.75 0 
                   01-1.06 0l-7.07-7.07a4.5 4.5 0 
                   010-6.364z"
              />
            </svg>
          </button>
        </div>

        {/* Mensaje de envío gratis */}
        <p className="text-xs text-gray-400 mt-3">
          Envíos nacionales gratis por compras mayores a S/. 100.00
        </p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  imagen: PropTypes.string,
  stock: PropTypes.bool,
  tallas: PropTypes.arrayOf(PropTypes.string),
  onBuyNow: PropTypes.func,
  onAddToCart: PropTypes.func,
  onAddToFavorites: PropTypes.func
};

ProductCard.defaultProps = {
  imagen: '',
  stock: true,
  tallas: [],
  onBuyNow: () => {},
  onAddToCart: () => {},
  onAddToFavorites: () => {}
};

export default ProductCard;
