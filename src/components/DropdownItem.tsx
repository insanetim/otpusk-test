import { Icon } from "@iconify-icon/react"
import type { Country, GeoEntity } from "../types"

type ItemType = Country | GeoEntity

interface DropdownItemProps {
  item: ItemType
  onClick?: (item: ItemType) => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({ item, onClick }) => {
  const getIconName = (item: GeoEntity) => {
    switch (item.type) {
      case "country":
        return "tabler:map-2"
      case "city":
        return "tabler:building-community"
      case "hotel":
        return "tabler:bed-filled"
    }
  }

  const renderContent = (item: ItemType) => {
    if ("flag" in item && !("type" in item)) {
      return (
        <>
          <img
            src={item.flag}
            alt={item.name}
          />
          <span>{item.name}</span>
        </>
      )
    } else {
      return (
        <>
          <Icon icon={getIconName(item)} />
          <span>{item.name}</span>
        </>
      )
    }
  }

  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
      onClick={() => onClick?.(item)}
    >
      {renderContent(item)}
    </div>
  )
}

export default DropdownItem
