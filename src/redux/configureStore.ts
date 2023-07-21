import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice"
import taskReducer from "./taskSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

const reducers = combineReducers({ lists: listReducer, tasks: taskReducer })

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
})

export const persistor = persistStore(store)