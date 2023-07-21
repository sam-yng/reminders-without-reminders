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
				listId: action.payload.listId
			}
			state.push(task)
		}
	}
})

export const { addTask } = taskSlice.actions
export default taskSlice.reducer