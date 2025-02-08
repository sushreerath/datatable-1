import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <div className="flex justify-center p-2">
      <input
        type="text"
        placeholder="Search by any field..."
        className="p-2 border rounded w-full sm:w-1/2"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
