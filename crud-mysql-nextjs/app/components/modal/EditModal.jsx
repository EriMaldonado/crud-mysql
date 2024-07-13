import React, { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const EditModal = ({
  productId,
  productName,
  productDescription,
  productPrice,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState(productName);
  const [description, setDescription] = useState(productDescription);
  const [price, setPrice] = useState(productPrice);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        id: productId,
        name,
        description,
        price: parseFloat(price),
      };

      const response = await axios.put(
        `/api/product/${productId}`,
        updatedProduct
      );

      if (response.status === 200) {
        onUpdate(productId, updatedProduct);
        onClose();
      } else {
        throw new Error(`Error updating product: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-70">
      <div className="relative max-w-md mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Editar Producto</h3>
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
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              inputMode="numeric"
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
            className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none"
            onClick={handleUpdate}
          >
            Guardar Cambios
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

export default EditModal;
