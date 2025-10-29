import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Compoents/Navbar";
import ProductList from "./pages/ProductList"
import Dashboard from "./pages/Deshbord"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import Wishlist from "./pages/WishList";
import { useAuth } from "./context/AuthContext"; 

function AdminRoute({children}){
  const { isAdmin, user}=useAuth();
  if(!user) return <Navigate to="/" />;
  return children;
}


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-6">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/products" element={
          <AdminRoute><AdminProducts /></AdminRoute>
        }/>
        <Route path="/admin/orders" element={
          <AdminRoute><AdminOrders /></AdminRoute >
        }/>

        <Route path="/wishlist" element={
          <AdminRoute><Wishlist /></AdminRoute>}/>
      </Routes>
      </div>
    </div>
  );
}