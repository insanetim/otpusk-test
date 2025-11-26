const ToursSearchForm = () => {
  return (
    <div className="w-[600px] max-w-full mx-auto bg-white shadow rounded-md px-4 pt-4 pb-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Tours Form</h1>
      <form className="flex flex-col gap-4">
        <input
          className="border border-gray-300 rounded-md flex items-center px-4 py-3 text-md"
          placeholder="Search"
          name="search"
          type="search"
        />
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
