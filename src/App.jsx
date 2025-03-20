import React, { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          description: newTask,
          completed: false,
        },
      ]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
    }
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (editingTask) {
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? editingTask : t))
      );
    }
    setShowEditModal(false);
    setEditingTask(null);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-blue-600 p-4">
        <div className="flex gap-4">
          <button className="bg-blue-700 px-4 py-2 rounded">Organização</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded">Tarefas</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl mb-8">
          Otimize seu tempo e se organize com o nosso Planejador Diário.
        </h1>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar nova tarefa..."
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 p-2 rounded hover:bg-blue-700"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4">Tarefa</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Opções</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-700">
                  <td className="p-4">{task.description}</td>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="w-5 h-5 rounded"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task)}
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Deseja excluir esse item?</h2>
              <p className="text-gray-600 mb-6">
                {taskToDelete?.description}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Não
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-white border border-gray-300 rounded"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Deseja editar esse item?</h2>
              <input
                type="text"
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border rounded mb-6"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Não
                </button>
                <button
                  onClick={confirmEdit}
                  className="px-4 py-2 bg-white border border-gray-300 rounded"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;