import InputWithDropdown from "./InputWithDropdown"

const ToursSearchForm = () => {
  return (
    <div className="w-[600px] max-w-full mx-auto bg-white shadow rounded-md px-4 pt-4 pb-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Tours Form</h1>
      <form className="flex flex-col gap-4">
        <InputWithDropdown />
        <button
          className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-md cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default ToursSearchForm
