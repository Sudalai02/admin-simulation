import React from "react";
import { useData } from "../context/DataContext";

export default function ProductCard({ product }) {
  const { cart, setCart, wishlist, setWishlist } = useData();
  const isOutOfStock = product.stock === 0;

  const addToCart = () => {
    if (isOutOfStock) return;
    const exists = cart.find(p => p.id === product.id);
    if (exists) {
      alert("Item already in cart");
      return;
    }
    setCart([...cart, product]);
  };

  const addToWishlist = () => {
    if (isOutOfStock) return;
    const exists = wishlist.find(p => p.id === product.id);
    if (exists) {
      alert("Already in wishlist");
      return;
    }
    setWishlist([...wishlist, product]);
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-medium">${product.price}</p>
        <p className={`mt-1 ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
          Stock: {product.stock}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className={`px-3 py-1 rounded-lg text-white ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={isOutOfStock}
          onClick={addToCart}
        >
          Add to Cart
        </button>

        <button
          className={`px-3 py-1 rounded-lg text-white ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}
          disabled={isOutOfStock}
          onClick={addToWishlist}
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}