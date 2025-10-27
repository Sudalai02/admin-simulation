import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function Navbar() {
  const { user, loginWithGoogle, logout, isAdmin } = useAuth();
  const { cart, wishlist } = useData();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">ShopApp</Link>

        {/* Hamburger Button (Mobile Only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 text-sm">
          <Link to="/" className="text-gray-600">Products</Link>
          {isAdmin && <Link to="/admin/products" className="text-gray-600">Admin Products</Link>}
          {isAdmin && <Link to="/admin/orders" className="text-gray-600">Admin Orders</Link>}

          <Link to="/cart" className="text-gray-700">Cart ({cart.length})</Link>
          <Link to="/wishlist" className="text-gray-700">Wishlist ({wishlist.length})</Link> 

          {!user ? (
            <button
              onClick={loginWithGoogle}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Login with Google
            </button>
          ) : (
            <>
              <span className="text-gray-600">{user.displayName || user.email}</span>
              <Link to="/dashboard" className="bg-gray-100 px-3 py-1 rounded">My Dashboard</Link>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {openMenu && (
        <div className="md:hidden flex flex-col gap-3 bg-gray-50 p-4 mt-2 text-sm">
          <Link to="/" onClick={() => setOpenMenu(false)}>Products</Link>
          {isAdmin && <Link to="/admin/products" onClick={() => setOpenMenu(false)}>Admin Products</Link>}
          {isAdmin && <Link to="/admin/orders" onClick={() => setOpenMenu(false)}>Admin Orders</Link>}

          <Link to="/cart" onClick={() => setOpenMenu(false)}>Cart ({cart.length})</Link>
          <Link to="/wishlist" onClick={() => setOpenMenu(false)}>Wishlist ({wishlist.length})</Link>

          {!user ? (
            <button
              onClick={() => { loginWithGoogle(); setOpenMenu(false); }}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Login with Google
            </button>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpenMenu(false)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                My Dashboard
              </Link>
              <button
                onClick={() => { logout(); setOpenMenu(false); }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}