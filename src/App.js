import { useReducer, useState } from "react";
import "./styles.css";

const initialTodos = [
  { id: 1, title: "Todo #1" },
  { id: 2, title: "Todo #2" },
  { id: 3, title: "Todo #3" }
];

// types of action that can be happen
const types = {
  add: "add",
  delete: "delete",
  update: "update"
};

// reducer function needs to be a pure function
const reducer = (state, action) => {
  switch (action.type) {
    case types.delete:
      return state.filter((todo) => todo.id !== action.payload);

    case types.add:
      return [...state, action.payload];

    case types.update:
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

    default:
      return state;
  }
};

export default function App() {
  /**
   * useReduccer params
   * todos, local state to manipulate
   * dispatch, update method for local state
   * reducer, pure function to manipulate the state throw dispatch
   * initialTodos, initial state of the component
   */
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState("");

  const handleDelete = (id) => {
    dispatch({ type: types.delete, payload: id });
  };

  const handleEdit = (todo) => {
    if (!text) return null;

    dispatch({ type: types.update, payload: { ...todo, title: text } });
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return null;

    const newTodo = { id: Date.now(), title: text };
    dispatch({ type: types.add, payload: newTodo });
    setText("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="add a todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
}
