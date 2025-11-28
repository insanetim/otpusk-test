export const calculateExponentialDelay = (
  attempt: number,
  baseDelay: number,
  backoffMultiplier: number = 2
): number => {
  return baseDelay * Math.pow(backoffMultiplier, attempt - 1)
}
