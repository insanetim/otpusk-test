import { fetchData } from "../lib/fetch"
import { getCountries } from "../server/api"
import type { CountriesMap } from "../types"

export const fetchCountries = fetchData<CountriesMap>(getCountries)
