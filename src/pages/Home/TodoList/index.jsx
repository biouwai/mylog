import React, { useState, useEffect } from "react";
import "./index.scss";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "uncompleted") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>全部</button>
        <button onClick={() => setFilter("uncompleted")}>未完成</button>
        <button onClick={() => setFilter("completed")}>已完成</button>
      </div>
      <div className="input-section">
        <input
          type="text"
          placeholder="添加新任务"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>添加</button>
      </div>
      <ul className="todo-list">
        {getFilteredTodos().map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
