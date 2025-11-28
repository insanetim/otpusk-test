import { useRef } from "react"
import useSearchInput from "../hooks/useSearchInput"
import useSearchPrices from "../hooks/useSearchPrices"
import DropdownItem from "./DropdownItem"
import type { InputWithDropdownRef } from "./InputWithDropdown"
import InputWithDropdown from "./InputWithDropdown"

const SearchForm = () => {
  const { searchValue, countryId, searchData, onInputChange, onItemClick } =
    useSearchInput()
  const { prices, loading, error, fetchSearchResult } = useSearchPrices()

  const inputRef = useRef<InputWithDropdownRef>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetchSearchResult(countryId)

    inputRef.current?.reset()
  }

  return (
    <div className="w-[600px] max-w-full mx-auto bg-white shadow rounded-md px-4 pt-4 pb-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Tours Form</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <InputWithDropdown
          ref={inputRef}
          initValue={searchValue}
          DropdownItemComponent={DropdownItem}
          dropdownItems={searchData}
          onInputChange={onInputChange}
          onItemClick={onItemClick}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-md cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm
