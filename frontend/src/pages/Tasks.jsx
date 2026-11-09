import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskAPI";
import "../App.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // load user info if available in localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to parse user info:", err);
    }
  }, []);

  // load tasks from MongoDb through backend
  // runs once when the page loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error(
          "Error loading tasks:",
          error.response?.data?.message || error.message,
        );
        setError(
          error.response?.data?.message ||
            "Unable to load tasks. Please log in again.",
        );
      }
    };
    fetchTasks();
  }, []);

  // add tasks
  const addTask = async (task) => {
    try {
      const response = await createTask(task);

      setTasks((previousTasks) => [...previousTasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // mark task as completed
  const completeTask = async (id) => {
    try {
      const response = await updateTask(id, {
        status: "Completed",
      });

      setTasks((previousTasks) =>
        previousTasks.map((task) => (task._id === id ? response.data : task)),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // delete task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== id),
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">✓</span>
          <span className="brand-name">Task Manager</span>
        </div>

        <div className="header-user">
          {user && (
            <div className="user-info">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          )}
          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </header>

      {error && <p role="alert">{error}</p>}

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        deleteTask={removeTask}
        completeTask={completeTask}
      />
    </div>
  );
};

export default Tasks;
