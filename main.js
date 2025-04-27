// Complex vanilla JS code for a dynamic todo list

const todoApp = {
  todos: [],

  // DOM Elements
  todoList: document.getElementById("todoList"),
  todoInput: document.getElementById("todoInput"),
  addButton: document.getElementById("addButton"),

  // Initialize the application
  init: function () {
    this.addButton.addEventListener("click", () => this.addTodo());
    this.loadTodos();
    this.render();
  },

  // Load todos from localStorage
  loadTodos: function () {
    const stored = localStorage.getItem("todos");
    this.todos = stored ? JSON.parse(stored) : [];
  },

  // Save todos to localStorage
  saveTodos: function () {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  },

  // Add new todo
  addTodo: function () {
    const text = this.todoInput.value.trim();
    if (text) {
      this.todos.push({
        id: Date.now(),
        text: text,
        completed: false,
      });
      this.todoInput.value = "";
      this.saveTodos();
      this.render();
    }
  },

  // Toggle todo completion
  toggleTodo: function (id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    this.saveTodos();
    this.render();
  },

  // Delete todo
  deleteTodo: function (id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
    this.render();
  },

  // Render the todo list
  render: function () {
    this.todoList.innerHTML = "";
    this.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => this.toggleTodo(todo.id));

      const span = document.createElement("span");
      span.textContent = todo.text;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => this.deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      this.todoList.appendChild(li);
    });
  },
};

// Initialize the app
document.addEventListener("DOMContentLoaded", () => todoApp.init());
