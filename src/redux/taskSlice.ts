import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"

export interface TaskState {
	tasks: Task[]
}

interface Task {
	id: string;
  name: string;
  complete?: boolean;
  flagged: boolean;
  listId: string | null;
	date: string
}

const initialState: Task[] = []

export const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action) => {
			const task: Task = {
				id: uuidv4(),
				name: action.payload.name,
				complete: false,
				flagged: false,
				listId: action.payload.listId,
				date: ""
			}
			state.push(task)
		},
		removeTask: (state, action) => {
			return state.filter((task) => task.id !== action.payload.id)
		},
		flagTask: (state, action) => {
			const index = state.findIndex((task) => task.id === action.payload.id)
			state[index].flagged = action.payload.flagged
		},
		setTaskDate: (state, action) => {
			const index = state.findIndex((task) => task.id === action.payload.id)
			state[index].date = action.payload.date
		},
	}
})

export const { addTask, removeTask, flagTask, setTaskDate } = taskSlice.actions
export default taskSlice.reducer