import { Icon } from "@iconify-icon/react"
import { useMemo } from "react"
import type { Services, TourDetails } from "../types"

interface TourDetailsCardProps {
  services: NonNullable<TourDetails["hotelServices"]>
}

const SERVICES_MAP: Record<keyof Services, { title: string; icon: string }> = {
  wifi: { title: "Wi-Fi", icon: "tabler:wifi" },
  aquapark: { title: "Aquapark", icon: "tabler:pool" },
  tennis_court: { title: "Tennis Court", icon: "tabler:ball-tennis" },
  laundry: { title: "Laundry", icon: "tabler:wash-machine" },
  parking: { title: "Parking", icon: "tabler:parking" },
}

const TourDetailsServices: React.FC<TourDetailsCardProps> = ({ services }) => {
  const filteredServices = useMemo(() => {
    return (Object.keys(SERVICES_MAP) as Array<keyof Services>).filter(
      key => services[key] !== "none"
    )
  }, [services])

  if (!filteredServices.length) return null

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-gray-800 text-xl font-semibold">Services</h3>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {filteredServices.map(service => {
          const { title, icon } = SERVICES_MAP[service]
          return (
            <div
              key={service}
              className="flex items-center gap-2"
            >
              <Icon icon={icon} /> {title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TourDetailsServices
