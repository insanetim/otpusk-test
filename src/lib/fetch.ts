type ApiFunction<Args extends unknown[] = unknown[]> = (
  ...args: Args
) => Promise<Response>

type RetryOptions = {
  maxAttempts?: number
  delayBetweenAttempts?: number
}

export const fetchData = <T, Args extends unknown[] = unknown[]>(
  apiFunction: ApiFunction<Args>
) => {
  return async (...args: Args): Promise<T> => {
    const response = await apiFunction(...args)
    const data = await response.json()

    return data as T
  }
}

export const fetchDataWithRetries = <T, Args extends unknown[] = unknown[]>(
  apiFunction: ApiFunction<Args>,
  { maxAttempts = 2, delayBetweenAttempts = 1000 }: RetryOptions = {}
) => {
  const fetchFunc = fetchData<T, Args>(apiFunction)

  return async (...args: Args) => {
    let attempt = 0

    while (attempt <= maxAttempts) {
      try {
        return await fetchFunc(...args)
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error
        }

        attempt++
        await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts))
      }
    }
  }
}
