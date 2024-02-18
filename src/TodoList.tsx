import { ChangeEvent, useEffect, useRef, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

function TodoList() {
  const baseUrlTasks = "http://localhost:3000/tasks";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addTodo() {
    if (inputRef.current) {
      const text = inputRef.current.value;
      const todoToAdd = {
        id: new Date().getTime(),
        title: text,
        description: "",
        done: false,
      };
      setTodos((prev) => [...prev, todoToAdd]);
      fetch(baseUrlTasks, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoToAdd),
      });
      inputRef.current.value = "";
    }
  }

  function removeTodo(todo: Todo) {
    setTodos((prev) => prev.filter((item) => item !== todo));
    fetch(baseUrlTasks + "/" + todo.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  }

  function doneTodo(todo: Todo) {
    todo.done = !todo.done;
    fetch(baseUrlTasks, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos((prev) => [...prev]);
  }

  function editTodo(todo: Todo, el: ChangeEvent<HTMLInputElement>) {
    todo.title = el.target.value;

    setTodos((prev) => [...prev]);
  }

  function saveEditTodo(todo: Todo) {
    fetch(baseUrlTasks, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setEditMode(false);
  }

  useEffect(() => {
    fetch(baseUrlTasks)
      .then((resp) => resp.json())
      .then((body) => {
        setTodos(body);
      });
  }, []);
  // criar uma função para marcar uma tarefa como feita
  // criar uma função para marcar uma tarefa como não feita

  // criar um estado para armazenar a tarefa atual
  // criar uma função para editar uma tarefa

  // Integração com a API nestjs
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <input ref={inputRef} type="text" placeholder="Adicionar Todo" />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <ul>
        {todos.map((todo, index) => {
          return (
            <li
              key={index}
              style={{ gap: 10, display: "flex", flexDirection: "row" }}
            >
              <button onClick={() => removeTodo(todo)}>Remover</button>
              <button
                onClick={() =>
                  editMode ? saveEditTodo(todo) : setEditMode(!editMode)
                }
              >
                {editMode ? "Salvar" : "Editar"}
              </button>
              <span
                style={{
                  textDecorationLine: todo.done ? "line-through" : "",
                  display: editMode ? "none" : "",
                }}
              >
                {todo.title}
              </span>
              <input
                type="text"
                style={{ display: editMode ? "" : "none" }}
                value={todo.title}
                onChange={(el) => editTodo(todo, el)}
              />
              <input
                type="checkbox"
                onChange={() => doneTodo(todo)}
                checked={todo.done}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
