import { combineSlices, configureStore } from "@reduxjs/toolkit"
import searchFormSlice from "./features/searchFormSlice"

const combinedReducers = combineSlices(searchFormSlice)

export const store = configureStore({
  reducer: combinedReducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
