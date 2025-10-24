import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function Cart() {
  const { cart, setCart } = useData();

  const removeItem = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const total = cart.reduce((s, p) => s + (p.price || 0), 0);

  if (!cart.length) return <div className="max-w-4xl mx-auto p-6"><p>Your cart is empty.</p></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.map(p => (
        <div key={p.id} className="flex justify-between items-center border-b py-3">
          <div>
            <h3 className="font-semibold">{p.name}</h3>
            <p>${p.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => removeItem(p.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="mt-4 text-right">
        <p className="font-bold">Total: ${total}</p>
        <Link to="/checkout" className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded">Proceed to Checkout</Link>
      </div>
    </div>
  );
}