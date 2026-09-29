// import React from 'react';

const TaskItems = ({ task, deleteTask, completeTask }) => {
  return (
    <div className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className="status">{task.status}</span>
      </div>

      <div className="task-actions">
        {task.status !== "Completed" && (
          <button onClick={() => completeTask(task.id)}>
            Mark as Completed
          </button>
        )}

        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItems;
