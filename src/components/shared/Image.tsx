import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface ImageProps {
  src?: string
  alt?: string
  className?: HTMLAttributes<HTMLElement>["className"]
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  return (
    <img
      className={twMerge("w-full h-40 object-cover rounded-md", className)}
      src={src}
      alt={alt}
    />
  )
}

export default Image
