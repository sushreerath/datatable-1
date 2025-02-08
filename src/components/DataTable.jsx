import React, { useState } from "react";
import { users } from "../data";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const DataTable = () => {
  const [searchFilters, setSearchFilters] = useState({ name: "", email: "", role: "" });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  
  const filteredData = users.filter((user) =>
    Object.entries(searchFilters).every(([key, value]) =>
      value.trim() ? user[key]?.toLowerCase().includes(value.toLowerCase()) : true
    )
  );


  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    return sortOrder === "asc"
      ? a[sortColumn] > b[sortColumn]
        ? 1
        : -1
      : a[sortColumn] < b[sortColumn]
      ? 1
      : -1;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-4">
      
      <SearchBar setSearchFilters={setSearchFilters} />

     
      <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="cursor-pointer p-3"
              onClick={() => {
                setSortColumn("name");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Name {sortColumn === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

     
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default DataTable;
