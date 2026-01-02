import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-4xl uppercase tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Insight<span className="text-orange-600">Edge</span>
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                    <Link to="/company-search" className="hover:text-blue-600">Search</Link>
                    <Link to="/us-companies" className="hover:text-blue-600">US Companies</Link>
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Start Free Trial
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-800"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow">
                    <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
                    <Link to="/company-search" className="block text-gray-700 hover:text-blue-600">Search</Link>
                    <Link to="/us-companies" className="block text-gray-700 hover:text-blue-600">US Companies</Link>
                    <button
                        onClick={() => navigate("/register")}
                        className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Start Free Trial
                    </button>
                </div>
            )}
        </header>
    );
}
