import { MagnifyingGlass } from "react-loader-spinner"

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-40">
      <MagnifyingGlass
        color="#155dfc"
        glassColor="#ebeff5"
      />
    </div>
  )
}

export default Loading
