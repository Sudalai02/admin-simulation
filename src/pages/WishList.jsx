import React from "react";
import { useData } from "../context/DataContext";

export default function Wishlist() {
  const { wishlist, setWishlist, cart, setCart } = useData();

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    if (item.stock === 0) return alert("Out of stock");
    setCart([...cart, item]); 
    removeFromWishlist(item.id); 
  };

  if (wishlist.length === 0)
    return <h2 className="text-center mt-10">Your wishlist is empty</h2>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {wishlist.map(item => (
        <div
          key={item.id}
          className="border p-4 mb-3 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>${item.price}</p>
            <p>Stock: {item.stock}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>

            <button
              onClick={() => addToCart(item)}
              disabled={item.stock === 0}
              className={`px-3 py-1 rounded ${
                item.stock === 0 ? "bg-gray-400" : "bg-green-600 text-white"
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}