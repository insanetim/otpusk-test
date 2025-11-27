import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchFormState {
  searchQuery: {
    value: string
    isCountry: boolean
  }
}

const initialState: SearchFormState = {
  searchQuery: {
    value: "",
    isCountry: true,
  },
}

const searchFormSlice = createSlice({
  name: "searchForm",
  initialState,
  reducers: {
    setSearchQuery(
      state,
      action: PayloadAction<{ value: string; isCountry: boolean }>
    ) {
      state.searchQuery = action.payload
    },
  },
  selectors: {
    selectSearchQuery: state => state.searchQuery,
  },
})

export const { setSearchQuery } = searchFormSlice.actions

export const { selectSearchQuery } = searchFormSlice.selectors

export default searchFormSlice
