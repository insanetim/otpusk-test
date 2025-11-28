import { combineSlices, configureStore } from "@reduxjs/toolkit"
import searchInputSlice from "./features/searchInputSlice"
import searchPricesSlice from "./features/searchPricesSlice"

const combinedReducers = combineSlices(searchInputSlice, searchPricesSlice)

export const store = configureStore({
  reducer: combinedReducers,
  devTools: import.meta.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
