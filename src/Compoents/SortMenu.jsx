import React from "react";

export default function SortMenu({ onSort }) {
  return (
    <select
      className="border border-gray-300 rounded-xl px-4 py-2"
      onChange={(e) => onSort(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
    </select>
  );
}