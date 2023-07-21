import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../redux/listSlice"

export default configureStore({
  reducer: { lists: listReducer }
})