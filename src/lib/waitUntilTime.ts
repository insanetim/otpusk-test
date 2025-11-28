export const waitUntilTime = (waitUntil: string): Promise<void> => {
  const targetTime = new Date(waitUntil).getTime()
  const now = Date.now()
  const delay = Math.max(0, targetTime - now)
  return new Promise(resolve => setTimeout(resolve, delay))
}
