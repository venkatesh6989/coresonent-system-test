import React, { useState } from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

function Todo({ todo, onEdit, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className='edit-container'>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className='input-edit'
          />
          <button onClick={handleEdit} className='btn btn-primary'>Save</button>
        </div>
      ) : (
        <div className='checkbox-task-container'>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className='checkbox'
          />
          <div className='task-container'>
            <span
                style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                }}
            >
                {todo.title}
            </span>
            <div>
                <button className='btn btn-success edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
                <button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
