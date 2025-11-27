import { useEffect, useRef, useState } from "react"
import { fetchCountries } from "../api/apiClient"
import type { Country, GeoEntity } from "../types"
import DropdownItem from "./DropdownItem"

interface InputWithDropdownProps {
  onSelect?: () => void
}

const InputWithDropdown = ({ onSelect }: InputWithDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [dropdownItems, setDropdownItems] = useState<Country[] | GeoEntity[]>(
    []
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOpenDropdown = async () => {
    setIsOpen(true)
    if (inputValue) {
      // logic to fetch items
    } else {
      const countries = await fetchCountries()
      setDropdownItems(Object.values(countries))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleItemClick = () => {
    console.log("Item clicked")
    // setInputValue(item.label)
    // setIsOpen(false)
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
          {dropdownItems.map(item => (
            <DropdownItem
              key={item.id}
              item={item}
              onClick={handleItemClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default InputWithDropdown
