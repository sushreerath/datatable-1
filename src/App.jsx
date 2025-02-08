import React from "react";
import DataTable from "./components/DataTable";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <DataTable />
      </div>
    </div>
  );
}

export default App;
