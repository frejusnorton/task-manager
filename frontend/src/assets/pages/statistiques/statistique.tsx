import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Sidebar from "../../components/Sidebar";

const Statistiques: React.FC = () => {
  // Données des tâches (à récupérer depuis une API plus tard)
  const tasks = [
    { id: 1, title: "Apprendre React", status: "En cours" },
    { id: 2, title: "Créer un projet", status: "Terminé" },
    { id: 3, title: "Refaire le design", status: "En cours" },
    { id: 4, title: "Déployer l'application", status: "Terminé" },
  ];

  // Calcul des statistiques
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((task) => task.status === "En cours").length;
  const completedTasks = tasks.filter((task) => task.status === "Terminé").length;

  // Données pour le graphique
  const data = [
    { name: "En cours", value: inProgressTasks },
    { name: "Terminées", value: completedTasks },
  ];

  const COLORS = ["#FFA500", "#32CD32"]; // Orange pour "En cours", Vert pour "Terminées"

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
        <Sidebar/>
      <h2 className="text-2xl font-bold text-center mb-6">Statistiques des tâches</h2>

      {/* Affichage des statistiques */}
      <div className="flex justify-around text-lg font-semibold mb-6">
        <p>Total : <span className="text-blue-600">{totalTasks}</span></p>
        <p>En cours : <span className="text-orange-500">{inProgressTasks}</span></p>
        <p>Terminées : <span className="text-green-600">{completedTasks}</span></p>
      </div>

      {/* Graphique en camembert */}
      <div className="flex justify-center">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Statistiques;
