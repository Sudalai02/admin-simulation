import React, { useEffect, useState } from "react";

const API_URL = "https://admin-simulation.onrender.com/product";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "" });

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json(); 
      setProducts(data);
    } catch (err) {
      console.error("Fetch products failed", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: "", category: "", price: "", stock: "" });
  };

  const saveEdit = async () => {
    try {
      const updated = { ...form, price: Number(form.price), stock: Number(form.stock) };
      await fetch(`${API_URL}/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete product?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const createProduct = async () => {
    if (!form.name) return alert("Provide a name");
    const newP = { name: form.name, category: form.category || "General", price: Number(form.price)||0, stock: Number(form.stock)||0 };
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newP)
    });
    setForm({ name: "", category: "", price: "", stock: "" });
    fetchProducts();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage Products</h2>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Create Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input className="border p-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}/>
          <input className="border p-2" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}/>
          <input className="border p-2" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})}/>
          <input className="border p-2" placeholder="Stock" value={form.stock} onChange={(e)=>setForm({...form, stock:e.target.value})}/>
        </div>
        <div className="mt-3">
          <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={createProduct}>Create</button>
        </div>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{p.name} <span className="text-sm text-gray-500">({p.category})</span></h4>
              <p className="text-sm">Price: ${p.price} — Stock: {p.stock}</p>
            </div>

            <div className="flex items-center gap-2">
              {editing === p.id ? (
                <>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={saveEdit}>Save</button>
                  <button className="bg-gray-300 px-3 py-1 rounded" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="bg-yellow-500 px-3 py-1 rounded" onClick={()=>startEdit(p)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={()=>deleteProduct(p.id)}>Delete</button>
                </>
              )}
            </div>

            {/* Inline edit form */}
            {editing === p.id && (
              <div className="w-full mt-3 md:mt-0 md:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input className="border p-2" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}/>
                  <input className="border p-2" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}/>
                  <input className="border p-2" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})}/>
                  <input className="border p-2" value={form.stock} onChange={(e)=>setForm({...form, stock:e.target.value})}/>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}