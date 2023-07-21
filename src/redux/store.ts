import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../redux/listSlice"
import taskReducer from "../redux/taskSlice"

export default configureStore({
  reducer: {
		lists: listReducer,
		tasks: taskReducer
	}
})