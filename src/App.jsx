import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts'
import TodoForms from './components/TodoForms'
import TodoItem from './components/TodoItems'

function App() {
  const [todos, settodos] = useState([])

  const addtodo = (todo) => {
    settodos([...todos, { id: Date.now(), ...todo }])
  }

  const updatetodo = (id, todo) => {
    settodos((prev) => prev.map((ptodo) => ptodo.id === id ? todo : ptodo))
  }

  const deletetodo = (id) => {
    settodos((prev) => prev.filter((ptodo) => ptodo.id !== id))
  }

  const togglecomplete = (id) => {
    settodos((prev) => prev.map((ptodo) => ptodo.id === id ? { ...ptodo, completed: !ptodo.completed } : ptodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length > 0) {
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider
      value={{ todos, addtodo, updatetodo, deletetodo, togglecomplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForms />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem key={todo.id} todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
