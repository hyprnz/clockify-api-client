import { AxiosError } from "axios";

export async function handleHttpError(err: any) {
  if (err instanceof AxiosError) {
    console.error(`HTTP error: ${err.response?.status} ${err.response?.statusText}`);
    console.error(`Message: ${err.message}`);
  } else {
    throw err;
  }
}
