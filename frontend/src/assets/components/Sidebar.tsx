import React from 'react'
import { useState } from 'react';
import { FiBarChart2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            {/* Sidebar */}
            <div className={`bg-white shadow-lg w-64 p-5 fixed h-full transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} transition-transform duration-300 ease-in-out md:translate-x-0`}>
                <h2 className="text-xl font-bold text-blue-600">Tableau de bord</h2>
                <nav className="mt-5">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-200 rounded-md">
                        <FiBarChart2 /> Dashboard
                    </Link>
                    <Link to="/statistiques" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-200 rounded-md">
                        <FiBarChart2 /> Statistiques
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Sidebar
