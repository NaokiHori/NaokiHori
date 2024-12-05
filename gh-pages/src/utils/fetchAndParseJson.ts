export async function fetchAndParseJson<T>(
  url: string,
  validator: (data: unknown) => data is T,
): Promise<T> {
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
      const data: unknown = await response.json();
      if (!validator(data)) {
        throw new Error(`json validation failed: invalid data type`);
      }
      return data as Promise<T>;
    });
}
