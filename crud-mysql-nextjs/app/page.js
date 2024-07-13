"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-2/4 text-center">
        <h1 className="text-2xl font-bold pt-8">
          Bienvenido al Aplicativo Web <br />
          Gestión Administración de Productos
        </h1>
        <div className="flex justify-center mt-8">
          <Image src="/developer.svg" alt="image" width={320} height={180} />
        </div>
        <p className="text-xl pt-4">Examen Final MIC Complexivo Caso</p>
        <p className="text-xl pt-4">Desarrollado por: Erick Maldonado</p>

        <div className="flex justify-center mt-8">
          <Link href="/auth/login">
            <p className="bg-blue-900 text-white px-4 py-2 rounded-md">
              Inicia Sesión para continuar
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
