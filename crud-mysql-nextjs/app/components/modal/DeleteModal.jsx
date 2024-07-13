import React from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const DeleteModal = ({ productId, productName, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/product/${productId}`);
      onDelete(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-70">
      <div className="relative max-w-md mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Confirmar eliminación</h3>
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Cerrar</span>
            <AiOutlineClose className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="text-gray-700">
            ¿Está seguro que desea eliminar el producto "{productName}"?
          </p>
        </div>

        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none"
            onClick={handleDelete}
          >
            Eliminar
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

export default DeleteModal;
