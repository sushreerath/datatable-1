import React, { useState } from "react";

const SearchBar = ({ setSearchFilters }) => {
  const [searchValues, setSearchValues] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (category, value) => {
    setSearchValues((prev) => ({
      ...prev,
      [category]: value.trimStart(),
    }));
  };

  const handleSearch = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(searchValues).map(([key, value]) => [key, value.trim()])
    );
    setSearchFilters(activeFilters);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
      {/* Name Search */}
      <button
        className={`px-2 py-2 rounded transition duration-200 ${
          searchValues.name ? "bg-blue-200" : "bg-gray-300 hover:bg-blue-200"
        }`}
      >
        Name
      </button>
      <input
        type="text"
        placeholder="Search by Name..."
        className="p-2 border rounded w-full sm:w-auto"
        value={searchValues.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />

      {/* Email Search */}
      <button
        className={`px-2 py-2 rounded transition duration-200 ${
          searchValues.email ? "bg-blue-200" : "bg-gray-300 hover:bg-blue-200"
        }`}
      >
        Email
      </button>
      <input
        type="text"
        placeholder="Search by Email..."
        className="p-2 border rounded w-full sm:w-auto"
        value={searchValues.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />

      {/* Role Search */}
      <button
        className={`px-2 py-2 rounded transition duration-200 ${
          searchValues.role ? "bg-blue-200" : "bg-gray-300 hover:bg-blue-200"
        }`}
      >
        Role
      </button>
      <input
        type="text"
        placeholder="Search by Role..."
        className="p-2 border rounded w-full sm:w-auto"
        value={searchValues.role}
        onChange={(e) => handleInputChange("role", e.target.value)}
      />

      {/* Search Button */}
      <button
        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
