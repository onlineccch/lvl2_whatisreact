const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li style={{ gap: 5, display: "flex" }}>
      <input onChange={onToggle} type="checkbox" checked={todo.completed} />
      <span>{todo.text}</span>
      <button onClick={onDelete}>delete</button>
    </li>
  );
};

export default TodoItem;
