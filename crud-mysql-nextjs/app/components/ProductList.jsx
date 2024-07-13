"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "./modal/DeleteModal";
import EditModal from "./modal/EditModal";
import AddModal from "./modal/AddModal";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    type: null,
    isOpen: false,
    product: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (type, product = null) => {
    setModalInfo({
      type,
      isOpen: true,
      product,
    });
  };

  const closeModal = () => {
    setModalInfo({
      type: null,
      isOpen: false,
      product: null,
    });
  };

  const handleUpdate = (productId, updatedProduct) => {
    setProducts(products.map((p) => (p.id === productId ? updatedProduct : p)));
    closeModal();
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    closeModal();
  };

  const handleAdd = (newProduct) => {
    setProducts([...products, newProduct]);
    closeModal();
  };

  return (
    <div className="container mx-auto mt-10 max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Listado de Productos
        </h2>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none flex items-center"
          onClick={() => openModal("add")}
        >
          <MdAdd className="h-5 w-5 mr-2" /> Añadir Productos
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs  text-gray-900 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs  text-gray-900 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 mr-2 rounded"
                  onClick={() => openModal("edit", product)}
                >
                  <AiOutlineEdit className="inline-block w-4 h-4 mr-1" /> Editar
                </button>
                <button
                  className="bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded"
                  onClick={() => openModal("delete", product)}
                >
                  <AiOutlineDelete className="inline-block w-4 h-4 mr-1" />{" "}
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalInfo.type === "add" && (
        <AddModal onClose={closeModal} onAdd={handleAdd} />
      )}

      {modalInfo.type === "edit" && (
        <EditModal
          productId={modalInfo.product.id}
          productName={modalInfo.product.name}
          productDescription={modalInfo.product.description}
          productPrice={modalInfo.product.price}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}

      {modalInfo.type === "delete" && (
        <DeleteModal
          productId={modalInfo.product.id}
          productName={modalInfo.product.name}
          onClose={closeModal}
          onDelete={() => handleDelete(modalInfo.product.id)}
        />
      )}
    </div>
  );
};

export default ProductList;
