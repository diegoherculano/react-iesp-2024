import { useRef, useState } from 'react'

interface Todo {
  text: string
  done: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  function addTodo() {
    if (inputRef.current) {
      const text = inputRef.current.value
      setTodos((prev) => [...prev, {text, done: false}])
      inputRef.current.value = ''
    }
  }

  function removeTodo(todo: Todo) {
    setTodos((prev) => prev.filter((item) => item !== todo))
  }

  // criar uma função para marcar uma tarefa como feita
  // criar uma função para marcar uma tarefa como não feita

  // criar um estado para armazenar a tarefa atual
  // criar uma função para editar uma tarefa
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}> 
      <div style={{display: "flex", flexDirection: 'row', gap: 10}}>
        <input ref={inputRef} type="text" placeholder="Adicionar Todo"/>
        <button onClick={addTodo}>Adicionar</button>
      </div>
      
      <ul>
        {todos.map((todo, index) => {
          return <li key={index} style={{gap: 10, display: 'flex', flexDirection: 'row'}}>
            <button onClick={() => removeTodo(todo)}>Remover</button>
            {todo.text} 
            <input type='checkbox' checked={todo.done}/>
          </li>
        })}
      </ul>
    </div>
  )
}

export default TodoList
