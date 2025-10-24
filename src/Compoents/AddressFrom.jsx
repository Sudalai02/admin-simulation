import React, { useState } from "react";
import { useData } from "../context/DataContext";

export default function AddressForm() {
  const { addresses, setAddresses } = useData();
  const [form, setForm] = useState({ name: "", address: "", city: "", phone: "" });

  const addAddress = () => {
    if (!form.name || !form.address || !form.city) {
      alert("Fill name, address and city");
      return;
    }
    const newAddr = { ...form, id: Date.now() };
    setAddresses([...addresses, newAddr]);
    setForm({ name: "", address: "", city: "", phone: "" });
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Add New Address</h3>
      <input className="border p-2 w-full mb-2"
      placeholder="Full name" 
      value={form.name} 
      onChange={(e)=>setForm({...form, name: e.target.value})}/>
      <input className="border p-2 w-full mb-2" 
      placeholder="Address" 
      value={form.address} 
      onChange={(e)=>setForm({...form, address: e.target.value})}/>
      <input className="border p-2 w-full mb-2" 
      placeholder="City" 
      value={form.city} 
      onChange={(e)=>setForm({...form, city: e.target.value})}/>
      <input className="border p-2 w-full mb-2" 
      placeholder="Phone (optional)" 
      value={form.phone} 
      onChange={(e)=>setForm({...form, phone: e.target.value})}/>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" 
      onClick={addAddress}>Save Address</button>
    </div>
  );
}