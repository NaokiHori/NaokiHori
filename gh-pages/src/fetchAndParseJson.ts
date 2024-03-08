export async function fetchAndParseJson<T> (url: string): Promise<T> {
  const composeMessage = (message: string): string => {
    return `${url}: ${message}`
  }
  return await fetch(url)
    .catch((error: Error): never => {
      throw new Error(composeMessage(error.message))
    })
    .then(async (response: Response): Promise<T> => {
      if (!response.ok) {
        throw new Error(composeMessage(response.statusText))
      }
      const data: Promise<T> = response.json()
      return await data
    })
}
