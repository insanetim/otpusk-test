import { fetchData } from "../lib/fetch"
import {
  getCountries,
  getSearchPrices,
  searchGeo,
  startSearchPrices,
} from "../server/api"
import type {
  CountriesMap,
  GeoResponse,
  GetSearchPricesResponse,
  StartSearchResponse,
} from "../types"

export const fetchCountriesQuery = fetchData<CountriesMap>(getCountries)

export const searchGeoQuery = fetchData<GeoResponse, [string?]>(searchGeo)

export const startSearchPricesQuery = fetchData<StartSearchResponse, [string]>(
  startSearchPrices
)

export const getSearchPricesQuery = fetchData<
  GetSearchPricesResponse,
  [string]
>(getSearchPrices)
