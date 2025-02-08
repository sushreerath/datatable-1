import React, { useState } from "react";
import { users } from "../data";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState([{ key: "name", direction: "asc" }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);


  const filteredData = users.filter((user) =>
    ["name", "email", "phone", "dob"].some((key) =>
      String(user[key] || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  
  const parseDOB = (dob) => {
    const [day, month, year] = dob.split("-").map(Number);
    const fullYear = year < 50 ? 2000 + year : 1900 + year;
    return new Date(fullYear, month - 1, day).getTime();
  };

  const sortedData = [...filteredData].sort((a, b) => {
    for (let { key, direction } of sortConfig) {
      let aValue = a[key];
      let bValue = b[key];
  
      if (key === "phone") {
        aValue = Number(a[key].replace(/\D/g, ""));
        bValue = Number(b[key].replace(/\D/g, ""));
      } else if (key === "dob") {
        aValue = parseDOB(a[key]);
        bValue = parseDOB(b[key]);
      } else {
        aValue = String(a[key] || "").toLowerCase();
        bValue = String(b[key] || "").toLowerCase();
      }
  
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
    }
    return 0; 
  });
  
  

 
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  
  const handleSort = (column) => {
    setSortConfig((prev) => {
      const existingSortIndex = prev.findIndex((sort) => sort.key === column);
      let newSortConfig;
  
      if (existingSortIndex !== -1) {
       
        newSortConfig = [
          { key: column, direction: prev[existingSortIndex].direction === "asc" ? "desc" : "asc" },
          ...prev.filter((_, index) => index !== existingSortIndex),
        ];
      } else {
        
        newSortConfig = [{ key: column, direction: "asc" }, ...prev];
      }
  
      return newSortConfig;
    });
  };
  
  
  return (
    <div className="overflow-x-auto p-4">
      {/* Search Bar */}
      <SearchBar setSearchTerm={setSearchTerm} />

      {/* Page Size Dropdown */}
      <div className="flex items-center justify-end mb-4">
        <label className="mr-2 text-gray-700 font-medium">Rows per page:</label>
        <select
          className="p-2 border border-gray-300 rounded"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[2,5,7,10].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            {["name", "email", "phone", "dob"].map((col) => {
              const columnSort = sortConfig.find((sort) => sort.key === col);
              return (
                <th
                  key={col}
                  className="cursor-pointer p-3"
                  onClick={() => handleSort(col)}
                  aria-label={`Sort by ${col}`}
                >
                  {col.toUpperCase()} {columnSort ? (columnSort.direction === "asc" ? "▲" : "▼") : ""}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.dob}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default DataTable;
