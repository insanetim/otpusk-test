import { Icon } from "@iconify-icon/react"
import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import type { ErrorResponse } from "../types"

interface ErrorAlertProps {
  error: ErrorResponse
  className?: HTMLAttributes<HTMLElement>["className"]
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, className }) => {
  return (
    <div
      className={twMerge(
        "bg-red-50 border-2 border-red-500 rounded-xl p-4 w-full max-w-[600px] mx-auto",
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <Icon
          icon="tabler:alert-circle"
          style={{ fontSize: "30px" }}
          className="text-red-500"
        />
        <div className="ml-3">
          <div className="text-red-700">
            <h3 className="font-medium text-lg">Error: {error.code}</h3>
            {error.message && (
              <p className="mt-1 text-md opacity-80">{error.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert
