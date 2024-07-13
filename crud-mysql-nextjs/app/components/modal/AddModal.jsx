import React, { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const AddProductModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async () => {
    try {
      if (!name || !description || !price) {
        setError("Todos los campos son requeridos");
        return;
      }

      const newProduct = {
        name,
        description,
        price: parseFloat(price),
      };

      const response = await axios.post("/api/product", newProduct);

      if (response.status === 201) {
        const addedProduct = response.data;
        onAdd(addedProduct);
        onClose();
      } else {
        throw new Error(`Error adding product: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const clearError = () => {
    setError("");
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setPrice(value);
      setError("");
    } else {
      setError("Ingrese solo números para el precio");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative max-w-md mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Agregar Producto</h3>
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Cerrar</span>
            <AiOutlineClose className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {error && (
          <div className="px-4 py-2 bg-red-100 text-red-600 text-sm">
            {error}
            <button
              className="ml-2 text-red-600 hover:text-red-700 focus:outline-none"
              onClick={clearError}
            >
              (X)
            </button>
          </div>
        )}

        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none"
            onClick={handleAdd}
          >
            Agregar Producto
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-600 font-semibold py-2 px-4 rounded focus:outline-none"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
