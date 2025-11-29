import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  children: React.ReactNode
  className?: HTMLAttributes<HTMLElement>["className"]
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-3 bg-white rounded-md shadow p-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
