import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService"; // Assurez-vous que le chemin est correct
import ProductCard from "../components/ProductCard"; 
import Navbar from "../includes/Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <>
    <Navbar />
    <div className="p-4">
      <h1 className="text-xl font-bold">Liste des produits</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} /> // Utilisation du composant
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
