import { APIError } from "./types";	

export const throwOnAPIError = async (action: string, response: Response) => {
  if (!response.ok) {
    const error: APIError = await response.json();
    console.error(`${action} not OK`, error);
    throw new Error(error.detail);
  };
}

export const unknownToError = (action: string, error: unknown) => {
  if (error instanceof Error) {
    return { success: false, error };
  }

  return { success: false, error: new Error(`Unknown error while doing ${action}.`) };
};