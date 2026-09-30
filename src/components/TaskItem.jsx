import React, { memo } from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className="task-label">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      </label>
      <button type="button" className="delete-button" onClick={() => onDelete(task.id)}
        aria-label={`Xóa ${task.title}`}>Xóa</button>
    </li>
  );
}

export default memo(TaskItem);
