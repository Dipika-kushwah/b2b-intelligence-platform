import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ALL_COLUMNS = [
  "ARR",
  "COMPANY",
  "DOMAIN",
  "YEAR",
  "TEAM SIZE",
  "HEADQUARTER",
  "NO. OF OFFICES",
  "GROWTH RATE",
  "WEBSITE",
  "MAIL",
  "CONTACT",
  "LINKEDIN",
  "FACEBOOK",
  "TWITTER",
  "SOURCE",
  "REGION"
];

export default function EnhancedDashboard() {
  const [raw, setRaw] = useState([]);
  const [column, setColumn] = useState("");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((r) => {
        setRaw(r.data);
        setFiltered(r.data);
      })
      .catch((err) => console.error("API error", err));
  }, []);

  function applyFilter() {
    if (!column || !query) {
      setFiltered(raw);
      setCurrentPage(1);
      return;
    }
    const q = query.toLowerCase();
    const res = raw.filter((rec) =>
      (rec[column] ?? "").toString().toLowerCase().includes(q)
    );
    setFiltered(res);
    setCurrentPage(1);
  }

  const totalArr = filtered.reduce((s, c) => s + (c.ARR || 0), 0);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const chartData = {
    labels: currentItems.map((c) => c.COMPANY),
    datasets: [
      {
        label: "ARR (USD M)",
        data: currentItems.map((c) => c.ARR || 0),
        backgroundColor: "#20c997",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 space-y-10">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={column}
          onChange={(e) => setColumn(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Select Column</option>
          {ALL_COLUMNS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type value to match"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400"
        />

        <div className="flex gap-2">
          <button
            onClick={applyFilter}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Filter
          </button>
          <button
            onClick={() => {
              setColumn("");
              setQuery("");
              setFiltered(raw);
              setCurrentPage(1);
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-md text-gray-600 mb-2 font-semibold">Total Shown</h3>
          <p className="text-3xl font-bold text-emerald-600">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-md text-gray-600 mb-2 font-semibold">Total ARR</h3>
          <p className="text-3xl font-bold text-emerald-600">
            ${totalArr.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">ARR of Selected Companies</h2>
        {currentItems.length ? (
          <div className="h-80">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No data to chart</p>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Companies</h2>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              {ALL_COLUMNS.map((h) => (
                <th key={h} className="px-4 py-2 border-b text-gray-600 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  {ALL_COLUMNS.map((h) => (
                    <td key={h} className="px-4 py-2 border-b">
                      {r[h] || "—"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={ALL_COLUMNS.length} className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
