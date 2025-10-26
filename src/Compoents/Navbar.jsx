import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function Navbar() {
  const { user, loginWithGoogle, logout, isAdmin } = useAuth();
  const { cart, wishlist } = useData();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">ShopApp</Link>
        <Link to="/" className="text-sm text-gray-600">Products</Link>
        {isAdmin && <Link to="/admin/products" className="text-sm text-gray-600">Admin Products</Link>}
        {isAdmin && <Link to="/admin/orders" className="text-sm text-gray-600">Admin Orders</Link>}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="text-sm">Cart ({cart.length})</Link>
        <div className="text-sm">Wishlist ({wishlist.length})</div>

        {!user ? (
          <button onClick={loginWithGoogle} className="bg-blue-600 text-white px-3 py-1 rounded">Login with Google</button>
        ) : (
          <>
            <span className="text-sm hidden md:inline">{user.displayName || user.email}</span>
            <Link to="/dashboard" className="bg-gray-100 px-3 py-1 rounded text-sm">My Dashboard</Link>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}