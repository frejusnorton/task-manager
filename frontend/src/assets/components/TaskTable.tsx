import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { allTasks } from "../services/taskServices"; // Assurez-vous que le chemin vers le service est correct
import AddTak from "../components/AddTask";

interface Task {
  id: number;
  title: string;
  status: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await allTasks();
        console.log(fetchedTasks);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Erreur de récupération des tâches", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAdd = (title: string, description: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      status: "En cours",
    };
    setTasks([...tasks, newTask]);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = filter === "Tous" ? tasks : tasks.filter(task => task.status === filter);

  const pageCount = Math.ceil(filteredTasks.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentTasks = filteredTasks.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Tâches</h2>
        <button
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <FiPlus /> Ajouter
        </button>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setCurrentPage(0); }}
          className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Tous">Tous</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b px-4 py-2 text-left text-gray-700">ID</th>
            <th className="border-b px-4 py-2 text-left text-gray-700">Tâche</th>
            <th className="border-b px-4 py-2 text-left text-gray-700">Statut</th>
            <th className="border-b px-4 py-2 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            currentTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2 text-gray-700">{task.id}</td>
                <td className="border-b px-4 py-2 text-gray-700">{task.title}</td>
                <td className="border-b px-4 py-2 text-gray-700">{task.status}</td>
                <td className="border-b px-4 py-2 flex justify-center gap-4">
                  <button className="text-yellow-500 hover:text-yellow-600 transition duration-300">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"← Précédent"}
        nextLabel={"Suivant →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-5 space-x-2"}
        pageClassName={"border px-4 py-2 rounded-lg cursor-pointer"}
        activeClassName={"bg-blue-500 text-white"}
        previousClassName={"border px-4 py-2 rounded-lg cursor-pointer"}
        nextClassName={"border px-4 py-2 rounded-lg cursor-pointer"}
        disabledClassName={"text-gray-400 cursor-not-allowed"}
      />

  
      <AddTak 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddTask={handleAdd} 
      />
    </div>
  );
};

export default TaskTable;
