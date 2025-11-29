import { Icon } from "@iconify-icon/react"
import type { TourDetails } from "../types"

interface TourDetailsCardProps {
  services: TourDetails["hotelServices"]
}

const TourDetailsServices: React.FC<TourDetailsCardProps> = ({ services }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-gray-800 text-xl font-semibold">Services</h3>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Icon icon="tabler:map-pin" /> Spain
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="tabler:map-pin" /> Spain
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="tabler:map-pin" /> Spain
        </div>
      </div>
    </div>
  )
}

export default TourDetailsServices
