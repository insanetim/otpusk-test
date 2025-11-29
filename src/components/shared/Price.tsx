import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { formatAmount } from "../../lib/formatAmount"

interface PriceProps {
  amount: number
  currency: string
  className?: HTMLAttributes<HTMLElement>["className"]
}

const Price: React.FC<PriceProps> = ({ amount, currency, className }) => {
  return (
    <p className={twMerge("text-lg font-semibold", className)}>
      {formatAmount(amount)} {currency.toUpperCase()}
    </p>
  )
}

export default Price
