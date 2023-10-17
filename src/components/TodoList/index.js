import React from 'react';
import Todo from '../Todo';

function TodoList({ todos, onEdit, onDelete, onToggle, showCompleted }) {
  const filteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.completed);

  return (
    <div>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
