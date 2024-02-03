import FirstExample from './FirstExample'
import TodoList from './TodoList'
import {Link, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <nav style={{marginBottom: 30, display: 'flex', flexDirection: 'row', gap:10}}>
        <Link to={'/'}>First Example</Link>
        <Link to={'/todo-list'}>Todo List</Link>
      </nav>
      <Routes>
        <Route path={'/:id'} element={<FirstExample/>}/>
        <Route path={'/todo-list'} element={<TodoList/>}/>
      </Routes>
    </div>
  )
}

// https://github.com/andersonleal/react-iesp-2024

export default App
