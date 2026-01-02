import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LogarithmicScale
);

export default function CompanySearch() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState(null);
  const [status, setStatus] = useState("");

  // Fetch all company data once
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((res) => setAllCompanies(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  // Handle search
  const handleSearch = () => {
    const found = allCompanies.find(
      (c) => c.COMPANY?.toLowerCase() === query.trim().toLowerCase()
    );
    setCompany(found || null);
    setStatus(found ? "" : "Company not found.");
  };

  // Create chart if company selected
  const chart = company
    ? (() => {
        const numericKeys = Object.keys(company).filter(
          (k) => typeof company[k] === "number"
        );

        return {
          data: {
            labels: numericKeys,
            datasets: [
              {
                label: company.COMPANY,
                data: numericKeys.map((k) => company[k]),
                backgroundColor: [
                  "#0d6efd",
                  "#20c997",
                  "#ffc107",
                  "#dc3545",
                  "#6f42c1",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                type: "logarithmic",
                beginAtZero: false,
                ticks: {
                  callback: function (value) {
                    return value >= 1000 ? value.toLocaleString() : value;
                  },
                },
              },
            },
          },
        };
      })()
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Company Search & Visualization
      </h2>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter full company name (e.g. Toyota Motor Corporation)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
        {status && <p className="text-red-500 mt-3">{status}</p>}
      </div>

      {company && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Company Details */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Company Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {Object.entries(company).map(([k, v]) => (
                <p key={k}>
                  <strong>{k.replace(/_/g, " ")}:</strong>{" "}
                  {typeof v === "number" ? v.toLocaleString() : v}
                </p>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Company Metrics Chart</h3>
            <div className="h-[300px]">
              <Bar data={chart.data} options={chart.options} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
