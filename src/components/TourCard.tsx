import type { PriceOffer } from "../types"

interface TourCardProps {
  price: PriceOffer
}

const TourCard: React.FC<TourCardProps> = ({ price }) => {
  return <pre>{JSON.stringify(price, null, 2)}</pre>
}

export default TourCard
