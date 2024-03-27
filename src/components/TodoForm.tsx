import { useState } from "react"
import { TodoOperations } from "../utils"
import { PropTypes } from "../interfaces"

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("")

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const updatedTodos = TodoOperations.addTodo(newTodoText)
      setTodos(updatedTodos)
      setNewTodoText("")
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a new task..."
        className="rounded-l bg-indigo-100 p-2 font-medium text-indigo-500 outline-none"
      />
      <button
        onClick={handleAddTodo}
        className="rounded-r bg-purple-500 px-4 py-2 font-medium transition duration-300 ease-in-out hover:bg-purple-600"
      >
        Add
      </button>
    </div>
  )
}
export default TodoForm
