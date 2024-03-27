import { TodoTypes } from "./interfaces"
import { nanoid } from "nanoid"

const LOCAL_STORAGE_KEY = "todos"

export const TodoOperations = {
  getTodos: (): TodoTypes[] => {
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY)
    return todos ? JSON.parse(todos) : []
  },

  addTodo: (text: string): TodoTypes[] => {
    const todos = TodoOperations.getTodos()
    const newTodo: TodoTypes = {
      id: nanoid(),
      text,
      completed: false,
    }
    const updatedTodos = [...todos, newTodo]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    return updatedTodos
  },

  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoOperations.getTodos()
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t))
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    return todo
  },

  deleteTodo: (id: string): void => {
    const todos = TodoOperations.getTodos()
    const updatedTodos = todos.filter((t) => t.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
  },
}
