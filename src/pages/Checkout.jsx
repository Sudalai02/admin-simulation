import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import AddressForm from "../Compoents/AddressFrom";

export default function Checkout() {
  const { user } = useAuth();
  const { cart, setCart, addresses, orders, setOrders } = useData();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (addresses.length && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const confirmOrder = () => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
    const addr = addresses.find(a => a.id === selectedAddressId);
    if (!addr) {
      alert("Select or add an address");
      return;
    }

    const newOrder = {
      id: Date.now(),
      user: user?.email || "guest",
      address: addr,
      items: cart,
      status: "On Process",
      date: new Date().toLocaleString()
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    alert("Order confirmed!");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <AddressForm />

      <h3 className="font-semibold mb-2">Select Address</h3>
      {addresses.length ? (
        addresses.map(a => (
          <label key={a.id} className="block border p-3 mb-2 rounded">
            <input type="radio" name="addr" className="mr-2" checked={selectedAddressId === a.id} onChange={() => setSelectedAddressId(a.id)} />
            <span>{a.name} — {a.address}, {a.city} {a.phone ? `— ${a.phone}` : ""}</span>
          </label>
        ))
      ) : (
        <p className="mb-4">No addresses saved. Add one above.</p>
      )}

      <div className="mt-4">
        <button onClick={confirmOrder} className="bg-green-600 text-white px-4 py-2 rounded">Confirm Order (No Payment)</button>
      </div>
    </div>
  );
}