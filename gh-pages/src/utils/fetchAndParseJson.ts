export async function fetchAndParseJson<T>(url: string): Promise<T> {
  const composeMessage = (message: string): string => {
    return `${url}: ${message}`;
  };
  return await fetch(url)
    .catch((error: unknown): never => {
      if (error instanceof Error) {
        throw new Error(composeMessage(error.message));
      } else {
        throw new Error(`failed to fetch json: ${url}`);
      }
    })
    .then(async (response: Response): Promise<T> => {
      if (!response.ok) {
        throw new Error(composeMessage(response.statusText));
      }
      const data = response.json() as Promise<T>;
      return await data;
    });
}
