import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"
import { fetchCountriesQuery, searchGeoQuery } from "../api/apiClient"
import {
  selectSearchQuery,
  setSearchQuery,
} from "../store/features/searchFormSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { Country, DropdownItemType, GeoEntity } from "../types"
import DropdownItem from "./DropdownItem"

interface InputWithDropdownProps {
  onSelect?: () => void
}

const InputWithDropdown = ({ onSelect }: InputWithDropdownProps) => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(searchQuery.value)
  const [dropdownItems, setDropdownItems] = useState<Country[] | GeoEntity[]>(
    []
  )
  const [debouncedSearch] = useState(() =>
    debounce((value: string) => {
      dispatch(setSearchQuery({ value, isCountry: false }))
    }, 300)
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOpenDropdown = async () => {
    setIsOpen(true)
  }

  useEffect(() => {
    // Cleanup debounce on component unmount
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputValue(value)
    debouncedSearch(value)
  }

  const handleItemClick = (item: DropdownItemType) => {
    const newValue = {
      value: item.name,
      isCountry: ("type" in item && item.type === "country") || "flag" in item,
    }
    setInputValue(newValue.value)
    dispatch(setSearchQuery(newValue))
    setIsOpen(false)
    onSelect?.()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchData = async (searchQuery: {
      value: string
      isCountry: boolean
    }) => {
      try {
        if (!searchQuery.isCountry && searchQuery.value.trim()) {
          const geo = await searchGeoQuery(searchQuery.value)
          setDropdownItems(Object.values(geo))
        } else {
          const countries = await fetchCountriesQuery()
          setDropdownItems(Object.values(countries))
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setDropdownItems([])
      }
    }

    fetchData(searchQuery)
  }, [searchQuery])

  return (
    <div
      className="relative w-full"
      ref={dropdownRef}
    >
      <input
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="search"
        placeholder="Search"
        value={inputValue}
        autoComplete="off"
        onChange={handleInputChange}
        onFocus={handleOpenDropdown}
      />

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {dropdownItems.length > 0 ? (
            <>
              {dropdownItems.map(item => (
                <DropdownItem
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                />
              ))}
            </>
          ) : (
            <p className="px-4 py-2">No results found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default InputWithDropdown
