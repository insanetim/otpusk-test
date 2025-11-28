import type { ErrorResponse } from "../types"
import { calculateExponentialDelay } from "./calculateExponentialDelay"
import { wait } from "./wait"

type ApiFunction<Args extends unknown[] = unknown[]> = (
  ...args: Args
) => Promise<Response>

type RetryOptions = {
  maxAttempts?: number
  delayBetweenAttempts?: number
  backoffMultiplier?: number
}

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

export const fetchDataWithRetries = <T, Args extends unknown[] = unknown[]>(
  apiFunction: ApiFunction<Args>,
  {
    maxAttempts = 2,
    delayBetweenAttempts = 1000,
    backoffMultiplier = 2,
  }: RetryOptions = {}
) => {
  const fetchFunc = fetchData<T, Args>(apiFunction)

  return async (...args: Args): Promise<T> => {
    let lastError: unknown

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fetchFunc(...args)
      } catch (error) {
        lastError = error

        if (attempt === maxAttempts) {
          break
        }

        const delay = calculateExponentialDelay(
          attempt,
          delayBetweenAttempts,
          backoffMultiplier
        )
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`)
        await wait(delay)
      }
    }

    throw lastError
  }
}
