import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchInputState {
  searchParams: {
    value: string
    countryId: string
    isCountry: boolean
  }
}

const initialState: SearchInputState = {
  searchParams: {
    value: "",
    countryId: "",
    isCountry: true,
  },
}

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    setSearchQuery(
      state,
      action: PayloadAction<SearchInputState["searchParams"]>
    ) {
      state.searchParams = action.payload
    },
  },
  selectors: {
    selectSearchParams: state => state.searchParams,
  },
})

export const { setSearchQuery } = searchInputSlice.actions

export const { selectSearchParams } = searchInputSlice.selectors

export default searchInputSlice
