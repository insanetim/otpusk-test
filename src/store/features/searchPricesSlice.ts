import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { GetSearchPricesResponse } from "../../types"

interface SearchPricesState {
  prices: GetSearchPricesResponse["prices"]
}

const initialState: SearchPricesState = {
  prices: {},
}

const searchPricesSlice = createSlice({
  name: "searchPrices",
  initialState,
  reducers: {
    setPrices: (
      state,
      action: PayloadAction<GetSearchPricesResponse["prices"]>
    ) => {
      state.prices = action.payload
    },
  },
  selectors: {
    selectPrices: state => state.prices,
  },
})

export const { setPrices } = searchPricesSlice.actions

export const { selectPrices: selectPrices } = searchPricesSlice.selectors

export default searchPricesSlice
