import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"

export interface RootState {
	lists: List[]
}

interface List {
	id: string
	name: string
}

const initialState: List[] = [
	 { id: uuidv4(), name: "example" }
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
    }
  }
})

export const { addList } = listSlice.actions
export default listSlice.reducer