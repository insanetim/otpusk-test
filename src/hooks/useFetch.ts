import { useCallback, useState } from "react"
import type { ErrorResponse } from "../types"

type ApiFunction<Args extends unknown[] = unknown[]> = (
  ...args: Args
) => Promise<Response>

const useFetch = <T, Args extends unknown[] = unknown[]>(
  fn: ApiFunction<Args>
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse | null>(null)

  const fetchData = useCallback(
    async (...args: Args): Promise<void> => {
      setLoading(true)
      try {
        const response = await fn(...args)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        setData(json as T)
        setError(null)
      } catch (error) {
        setError(error as ErrorResponse)
        setData(null)
      } finally {
        setLoading(false)
      }
    },
    [fn]
  )

  return { data, loading, error, fetchData }
}

export default useFetch
