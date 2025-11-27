import { Icon } from "@iconify-icon/react"
import type { Country, GeoEntity } from "../types"

export type DropdownItemType = Country | GeoEntity

export interface DropdownItemProps {
  item: DropdownItemType
  onClick?: (item: DropdownItemType) => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({ item, onClick }) => {
  const iconMap: Record<GeoEntity["type"], string> = {
    country: "tabler:map-2",
    city: "tabler:building-community",
    hotel: "tabler:bed-filled",
  }

  const renderContent = (item: DropdownItemType) => {
    const isCountry = "flag" in item && !("type" in item)

    return (
      <>
        {isCountry ? (
          <img
            src={item.flag}
            alt={item.name}
          />
        ) : (
          <Icon icon={iconMap[item.type]} />
        )}
        <span>{item.name}</span>
      </>
    )
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
