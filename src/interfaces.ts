import { Dispatch, SetStateAction } from "react"

export interface TodoTypes {
  id: string
  text: string
  completed: boolean
}

export interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>
}
