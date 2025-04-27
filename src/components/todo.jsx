import React, { useState, useEffect } from "react";
import TodoItem from "./todo_item";

// React version of the todo list
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => {
              setTodos(
                todos.map((t) =>
                  t.id === todo.id ? { ...t, completed: !t.completed } : t,
                ),
              );
            }}
            onDelete={() => {
              setTodos(todos.filter((t) => t.id !== todo.id));
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
