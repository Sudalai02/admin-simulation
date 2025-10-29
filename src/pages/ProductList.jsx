import React, { useEffect, useState } from "react";
import ProductCard from "../Compoents/ProductCard";
import SearchBar from "../Compoents/SearchBar";
import SortMenu from "../Compoents/SortMenu"

const API_URL = "https://admin-simulation.onrender.com/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchProducts() { 
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const normalized = data.map((p) => ({
          id: p.id,
          name: p.name || p.title || "Unknown",
          category: p.category || "General",
          price: p.price || 0,
          stock: typeof p.stock === "number" ? p.stock : (p.rating?.count ? Math.max(0, Math.floor(p.rating.count / 10)) : 5)
        }));
        setProducts(normalized);
        setFiltered(normalized);
      } catch (err) {
        console.error(err);
        const sample = [
          { id: 1, name: "Smartphone", category: "Electronics", price: 299, stock: 5 },
          { id: 2, name: "Laptop", category: "Electronics", price: 899, stock: 0 },
          { id: 3, name: "T-Shirt", category: "Clothing", price: 20, stock: 10 }
        ];
        setProducts(sample);
        setFiltered(sample);
      }
    }
    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    const t = term.trim().toLowerCase();
    if (!t) return setFiltered(products);
    setFiltered(products.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t)));
  };

  const handleSort = (option) => {
    const arr = [...filtered];
    if (option === "price-asc") arr.sort((a,b)=>a.price-b.price);
    if (option === "price-desc") arr.sort((a,b)=>b.price-a.price);
    if (option === "name-asc") arr.sort((a,b)=>a.name.localeCompare(b.name));
    if (option === "name-desc") arr.sort((a,b)=>b.name.localeCompare(a.name));
    setFiltered(arr);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <div className="md:ml-auto">
          <SortMenu onSort={handleSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}