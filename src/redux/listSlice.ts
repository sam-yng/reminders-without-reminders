import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"

export interface ListState {
	lists: List[]
}

export interface List {
	id: string
	name: string
}

const initialState: List[] = [
	 { id: uuidv4(), name: "my first list" }
]

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      const list: List = {
        id: uuidv4(),
        name: action.payload.name
      }
      state.push(list)
    },
		removeList: (state, action) => {
			return state.filter((list) => list.id !== action.payload.id)
		}
  }
})

export const { addList, removeList } = listSlice.actions
export default listSlice.reducer