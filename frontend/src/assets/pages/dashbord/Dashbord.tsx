import React, { useState } from "react";
import Seo from "../../components/Seo";

import { FiMenu, FiX } from "react-icons/fi";
import TaskTable from "../../components/TaskTable";
import Sidebar from "../../components/Sidebar";

const Dashbord: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <Seo title="Tableau de bord - Task Manager" description=" Task Manager, votre gestionnaire de tâches." />
            <Sidebar />
            {/* Contenu principal */}
            <div className="flex-1 p-5 md:ml-64">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-3xl">
                    {sidebarOpen ? <FiX /> : <FiMenu />}
                </button>
                <h1 className="text-3xl font-bold">Bienvenue sur le Dashboard</h1>
                <TaskTable />
            </div>
        </div>
    );
};

export default Dashbord;
