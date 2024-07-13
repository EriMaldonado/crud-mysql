"use client";

import React from "react";
import { signOut } from "next-auth/react";
function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold mb-2 text-white">
        Gestión de Productos
      </div>

      <div className="flex items-center">
        <button
          className="bg-slate-200 text-black font-semibold px-4 py-2 rounded-md"
          onClick={() => signOut()}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
