// import React from 'react';
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./api/taskAPI";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // load tasks from MongoDb through backend
  // runs once when the page loads
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data);
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
        previousTasks.map((task) => (task.id === id ? response.data : task)),
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

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        deleteTask={removeTask}
        completeTask={completeTask}
      />
    </div>
  );
};

export default App;
