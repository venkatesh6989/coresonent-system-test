import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Fetch todos from the API when the component mounts
    axios.get('https://jsonplaceholder.typicode.com/users/1/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    // Create a new todo object
    const newId = todos.length + 1; // You can generate a unique ID using a more robust method
    const newTodoObj = {
      userId: 1,
      id: newId,
      title: newTodo,
      completed: false,
    };

    // Update the todos
    setTodos([...todos, newTodoObj]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className='w-100 p-5'>
      <h1 className='todo-heading'>Todos</h1>
      <h1 className='task-heading'>Create <span className='span-task'>Tasks</span></h1>
      <input
        type="text"
        placeholder="What needs to be done"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className='input-field'
      /><br/>
      <button onClick={addTodo} className='btn btn-primary mt-3 mb-3'>Add</button><br/>
      <h1 className='task-heading'>My <span className='span-task'>Tasks</span></h1>
      <label className='label'>
        Show Completed Tasks:
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
          className='checkbox'
        />
      </label>
      <TodoList
        todos={todos}
        onEdit={editTodo}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        showCompleted={showCompleted}
      />
    </div>
  );
}

export default App;
