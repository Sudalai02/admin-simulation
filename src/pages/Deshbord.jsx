import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { wishlist, cart, orders } = useData();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (user) {
      setUserOrders(orders.filter(o => o.user === user.email));
    } else {
      setUserOrders([]);
    }
  }, [orders, user]);

  if (!user) {
    return <div className="max-w-4xl mx-auto p-6"><p>Please log in to view your dashboard.</p></div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.displayName}</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Wishlist</h3>
        {wishlist.length ? wishlist.map(p => (
          <div key={p.id} className="border p-2 rounded mb-2">{p.name} — ${p.price}</div>
        )) : <p>No products in wishlist.</p>}
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Cart</h3>
        {cart.length ? cart.map(p => (
          <div key={p.id} className="border p-2 rounded mb-2">{p.name} — ${p.price}</div>
        )) : <p>No items in cart.</p>}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Order History</h3>
        {userOrders.length ? userOrders.map(order => (
          <div key={order.id} className="border p-4 rounded mb-3">
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Date:</b> {order.date}</p>
            <p><b>Address:</b> {order.address.address}, {order.address.city}</p>
            <p><b>Status:</b> <span className="text-blue-600">{order.status}</span></p>
            <div className="mt-2">
              <details>
                <summary className="cursor-pointer text-sm text-gray-600">Items ({order.items.length})</summary>
                <ul className="mt-2">
                  {order.items.map(i => <li key={i.id}>{i.name} — ${i.price}</li>)}
                </ul>
              </details>
            </div> 
          </div>
        )) : <p>No orders yet.</p>}
      </section>
    </div>
  );
}