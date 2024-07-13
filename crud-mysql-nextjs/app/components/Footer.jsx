import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-2">
          Desarrollado por : Erick Maldonado
        </h1>
        <p className="text-sm">
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
