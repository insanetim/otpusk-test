import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchInputState {
  searchQuery: {
    value: string
    isCountry: boolean
  }
}

const initialState: SearchInputState = {
  searchQuery: {
    value: "",
    isCountry: true,
  },
}

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    setSearchQuery(
      state,
      action: PayloadAction<SearchInputState["searchQuery"]>
    ) {
      state.searchQuery = action.payload
    },
  },
  selectors: {
    selectSearchQuery: state => state.searchQuery,
  },
})

export const { setSearchQuery } = searchInputSlice.actions

export const { selectSearchQuery } = searchInputSlice.selectors

export default searchInputSlice
