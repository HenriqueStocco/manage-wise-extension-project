export function generateRandomNumber(length: number): number {
  const lowerLimit = 10 ** (length - 1)
  const upperLimit = 10 ** length
  const randomNumber = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit

  return randomNumber
}
