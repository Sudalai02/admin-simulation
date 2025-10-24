import React from "react";

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border border-gray-300 rounded-xl px-4 py-2 w-1/2"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}