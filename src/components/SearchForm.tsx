import { useRef } from "react"
import useSearchInput from "../hooks/useSearchInput"
import DropdownItem from "./DropdownItem"
import type { InputWithDropdownRef } from "./InputWithDropdown"
import InputWithDropdown from "./InputWithDropdown"

interface SearchFormProps {
  onSubmit?: () => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const { searchValue, searchData, onInputChange, onItemClick } =
    useSearchInput()

  const inputRef = useRef<InputWithDropdownRef>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    inputRef.current?.reset()
    onSubmit?.()
  }

  return (
    <div className="w-[600px] max-w-full mx-auto bg-white shadow rounded-md p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Search Tours Form
      </h1>
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
          placeholder="Select a country"
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
