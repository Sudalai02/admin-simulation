import React from "react";
import { useData } from "../context/DataContext";

export default function AdminOrders() {
  const { orders, setOrders } = useData();

  const updateStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
  };

  if (!orders.length) return <div className="max-w-5xl mx-auto p-6"><p>No orders yet.</p></div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>User:</b> {order.user}</p>
          <p><b>Date:</b> {order.date}</p>
          <p><b>Address:</b> {order.address.address}, {order.address.city}</p>
          <p><b>Current Status:</b> {order.status}</p>

          <div className="mt-2">
            <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="border p-1 rounded">
              <option>On Process</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}