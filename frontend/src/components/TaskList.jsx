// import React from 'react';
import TaskItems from "./TaskItems";

const TaskList = ({ tasks, deleteTask, completeTask }) => {
  if (tasks.length === 0) {
    return <p>No tasks available</p>;
  }
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItems
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
