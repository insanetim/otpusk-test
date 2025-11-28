import { createSlice } from "@reduxjs/toolkit"
import type { ErrorResponse, GetSearchPricesResponse } from "../../types"

interface SearchResultState {
  data: GetSearchPricesResponse | null
  loading: boolean
  error: ErrorResponse | null
}

const initialState: SearchResultState = {
  data: null,
  loading: false,
  error: null,
}

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {},
})

export default searchResultSlice
