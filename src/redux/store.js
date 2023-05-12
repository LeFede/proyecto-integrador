import { configureStore } from "@reduxjs/toolkit"
import charactersReducer from "./charactersSlice"

const store = configureStore({
  reducer: charactersReducer,
})

export default store
