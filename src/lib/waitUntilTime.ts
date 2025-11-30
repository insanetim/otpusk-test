export const waitUntilTime = (
  waitUntil: string,
  signal?: AbortSignal
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Wait cancelled"))
      return
    }

    const targetTime = new Date(waitUntil).getTime()
    const now = Date.now()
    const delay = Math.max(0, targetTime - now)

    const timeoutId = setTimeout(resolve, delay)

    if (signal) {
      const onAbort = () => {
        clearTimeout(timeoutId)
        reject(new Error("Wait cancelled"))
      }

      signal.addEventListener("abort", onAbort, { once: true })
    }
  })
}
