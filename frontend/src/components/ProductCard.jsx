import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUtils";
import { BASE_URL } from "../services/api";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/product/${product._id}`}>
        <img
          src={getImageUrl(BASE_URL, product.imageUrl)}
          alt={product.name}
          className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h2>
        <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
        
        <Link
          to={`/product/${product._id}`}
          className="mt-4 block text-center w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Ajouter au panier
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
