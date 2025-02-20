import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
    return (
        <header className="bg-pink-100 bg-opacity-80 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center">
            {/* Logo */}
            <h1 className="text-3xl font-bold text-pink-600">Urban Clothes</h1>

            {/* Navegación */}
            <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-pink-500 transition">Inicio</a>
                <a href="#" className="text-gray-700 hover:text-pink-500 transition">Productos</a>
                <a href="#" className="text-gray-700 hover:text-pink-500 transition">Ofertas</a>
                <a href="#" className="text-gray-700 hover:text-pink-500 transition">Contacto</a>
            </nav>

            {/* Iconos */}
            <div className="flex items-center space-x-4">
                <i className="bi bi-person w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer" />
                <i className="bi bi-cart3 w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;
