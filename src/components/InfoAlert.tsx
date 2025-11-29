import { Icon } from "@iconify-icon/react"
import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface InfoAlertProps {
  children: React.ReactNode
  className?: HTMLAttributes<HTMLElement>["className"]
}

const InfoAlert: React.FC<InfoAlertProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-4 bg-white shadow rounded-xl text-center text-xl text-gray-600 py-8 px-4 w-full max-w-[600px] mx-auto",
        className
      )}
    >
      <Icon
        icon="tabler:info-triangle"
        style={{ fontSize: "42px" }}
      />
      {children}
    </div>
  )
}

export default InfoAlert
