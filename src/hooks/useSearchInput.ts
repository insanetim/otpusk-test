import { debounce } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import { fetchCountriesQuery, searchGeoQuery } from "../api/apiClient"
import type { DropdownItemType } from "../components/DropdownItem"
import {
  selectSearchParams,
  setSearchQuery,
} from "../store/features/searchInputSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { CountriesMap, Country, GeoEntity, GeoResponse } from "../types"

const useSearchInput = () => {
  const dispatch = useAppDispatch()
  const searchParams = useAppSelector(selectSearchParams)

  const [searchData, setSearchData] = useState<Country[] | GeoEntity[]>([])
  const debouncedSearchRef = useRef(
    debounce((value: string) => {
      dispatch(setSearchQuery({ value, countryId: "", isCountry: false }))
    }, 300)
  )

  const onInputChange = useCallback((value: string) => {
    debouncedSearchRef.current(value)
  }, [])

  const onItemClick = useCallback(
    (item: DropdownItemType) => {
      const newValue = {
        value: item.name,
        countryId: "flag" in item ? item.id : item.countryId,
        isCountry:
          ("type" in item && item.type === "country") || "flag" in item,
      }
      dispatch(setSearchQuery(newValue))
    },
    [dispatch]
  )

  useEffect(() => {
    const fetchData = async (searchQuery: {
      value: string
      isCountry: boolean
    }) => {
      try {
        let data: CountriesMap | GeoResponse
        if (!searchQuery.isCountry && searchQuery.value) {
          data = await searchGeoQuery(searchQuery.value)
        } else {
          data = await fetchCountriesQuery()
        }
        setSearchData(Object.values(data))
      } catch (error) {
        console.error("Error fetching data:", error)
        setSearchData([])
      }
    }

    fetchData(searchParams)
  }, [searchParams])

  useEffect(() => {
    const searchFunc = debouncedSearchRef.current

    return () => {
      searchFunc.cancel()
    }
  }, [])

  return {
    searchValue: searchParams.value,
    searchData,
    onInputChange,
    onItemClick,
  }
}

export default useSearchInput
