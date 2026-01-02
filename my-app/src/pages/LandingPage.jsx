import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Header />
      {/* Hero Section */}
      <motion.section
        className="relative text-white py-24 px-6 text-center bg-gradient-to-br from-[#ff416c] via-[#ff4b2b] to-[#ff416c]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-pink-300 drop-shadow-md">
          Supercharge Your B2B Intelligence
        </h1>
        <p className="text-xl mb-8 text-white/90">
          Discover, analyze, and visualize company data like never before.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            onClick={() => navigate("/register")}
          >
            Start Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            onClick={() => navigate("/dashboard")}
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>

      {/* Trusted Numbers */}
      <section className="py-16 text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Trusted by 10,000+ Businesses
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-12 text-lg">
          {[
            { label: "Companies Indexed", value: "2M+", color: "text-pink-500" },
            { label: "User Satisfaction", value: "95%", color: "text-yellow-500" },
            { label: "Insights Delivered", value: "500K+", color: "text-green-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="transition-transform hover:scale-105"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + i * 0.2 }}
            >
              <h3 className={`text-4xl font-bold ${item.color}`}>{item.value}</h3>
              <p className="text-gray-700">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Overview Cards */}
      <section className="bg-gray-100 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Smarter Tools for Smarter Teams</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
          {[
            {
              title: "Pipeline Builder",
              desc: "Track and qualify high-value prospects effortlessly.",
            },
            {
              title: "Call Assistant",
              desc: "Arm your sales team with real-time call insights.",
            },
            {
              title: "Company Insights",
              desc: "Segment companies by ARR, growth, industry and more.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white bg-opacity-80 backdrop-blur shadow-lg p-6 rounded-xl text-center border border-gray-200 hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <h3 className="text-xl font-bold mb-2 text-blue-600">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
          {["AI Scoring", "Data Accuracy", "Smart Filters", "CRM Sync"].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-700">{feature}</h3>
              <p className="text-sm text-gray-600">Tools that boost your outreach and targeting.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-orange-100 py-20 text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Join Thousands of Growth Teams</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Whether you’re a startup or enterprise, ReactBit gives you the power to identify, qualify, and engage with the right companies.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition"
        >
          Start Your Free Trial
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} InsightEdge</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/register" className="hover:underline">Trial</a>
          <a href="/company-search" className="hover:underline">Search</a>
        </div>
      </footer>
    </div>
  );
}
