import type { ErrorResponse } from "../types"

type ApiFunction<Args extends unknown[] = unknown[]> = (
  ...args: Args
) => Promise<Response>

export const fetchData = <T, Args extends unknown[] = unknown[]>(
  apiFunction: ApiFunction<Args>
) => {
  return async (...args: Args): Promise<T> => {
    try {
      const response = await apiFunction(...args)
      const data = await response.json()
      return data as T
    } catch (error) {
      if (error instanceof Response) {
        const errorData = await error.json()
        throw errorData as ErrorResponse
      }
      throw error
    }
  }
}
