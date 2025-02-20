const Footer = () => {
    return (
      <footer className="bg-pink-100 bg-opacity-80 backdrop-blur-md shadow-inner py-6 px-4 text-center">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} Urban Clothes. Todos los derechos reservados.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-pink-500 transition">Términos y Condiciones</a>
          <a href="#" className="text-gray-700 hover:text-pink-500 transition">Política de Privacidad</a>
          <a href="#" className="text-gray-700 hover:text-pink-500 transition">Contacto</a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  