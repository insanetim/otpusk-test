import { useCallback, useEffect, useRef, useState } from "react"
import type { DropdownItemProps, DropdownItemType } from "./DropdownItem"

interface InputWithDropdownProps {
  initValue?: string
  DropdownItemComponent: React.FC<DropdownItemProps>
  dropdownItems: DropdownItemType[]
  onInputChange?: (value: string) => void
  onItemClick?: (item: DropdownItemType) => void
}

const InputWithDropdown = ({
  initValue = "",
  DropdownItemComponent,
  dropdownItems,
  onInputChange,
  onItemClick,
}: InputWithDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(initValue)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOpenDropdown = () => {
    setIsOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputValue(value)
    onInputChange?.(value)
  }

  const handleItemClick = useCallback(
    (item: DropdownItemType) => {
      setInputValue(item.name)
      onItemClick?.(item)
      setIsOpen(false)
    },
    [onItemClick]
  )

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
          {dropdownItems.length > 0 ? (
            <>
              {dropdownItems.map(item => (
                <DropdownItemComponent
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
