import { useState } from "react"
import { TodoTypes } from "../interfaces"
import { TodoOperations } from "../utils"
import { TodoForm } from "."
import { FaCheck, FaEdit } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { RiDeleteBin5Fill } from "react-icons/ri"

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoOperations.getTodos())
  const [editTodoID, setEditTodoID] = useState<string | null>(null)
  const [editedTodoText, setEditedTodoText] = useState<string>("")

  const handleEditStart = (id: string, text: string) => {
    setEditTodoID(id)
    setEditedTodoText(text)
  }

  const handleEditCancel = () => {
    setEditTodoID(null)
    setEditedTodoText("")
  }

  const handleEditSave = (id: string) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoOperations.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      })
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      )
      setEditTodoID(null)
      setEditedTodoText("")
    }
  }

  const handleDeleteTodo = (id: string) => {
    TodoOperations.deleteTodo(id)
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="mx-4">
      <div className="mb-4 p-2 text-center">
        <TodoForm setTodos={setTodos} />
      </div>

      <ul className="container mx-auto flex flex-col gap-6 rounded-xl p-5 ">
        {todos.length === 0 ? (
          <h1 className="text-center text-2xl font-medium">
            No Todos added, yet!
          </h1>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center rounded-lg bg-teal-500 p-2 shadow-lg shadow-sky-500 transition duration-300 ease-in-out hover:bg-teal-400"
            >
              {editTodoID === todo.id ? (
                <div className="flex w-full items-center justify-between gap-2 p-2">
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    autoFocus={true}
                    className="w-3/4 rounded bg-teal-300 p-1 font-medium outline-none"
                  />
                  <div className="w-1/3 space-x-2 text-end">
                    <button onClick={() => handleEditSave(todo.id)}>
                      <FaCheck className="text-xl text-green-700" />
                    </button>
                    <button onClick={() => handleEditCancel()}>
                      <GiCancel className="text-xl text-yellow-500" />
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <RiDeleteBin5Fill className="text-xl text-red-500" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between gap-4 p-2">
                  <p className="flex-1 text-lg font-medium">{todo.text}</p>
                  <div className="space-x-2">
                    <button onClick={() => handleEditStart(todo.id, todo.text)}>
                      <FaEdit className="text-xl text-yellow-500" />
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>
                      <RiDeleteBin5Fill className="text-xl text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </ul>
    </div>
  )
}
export default TodoList
