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

    const timeoutId = setTimeout(() => {
      cleanup()
      resolve()
    }, delay)

    const onAbort = () => {
      cleanup()
      reject(new Error("Wait cancelled"))
    }

    const cleanup = () => {
      clearTimeout(timeoutId)
      signal?.removeEventListener("abort", onAbort)
    }

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true })
    }
  })
}
