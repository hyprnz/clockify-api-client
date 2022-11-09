import { AxiosError } from "axios";
import log from "../config/logger";

export function handleHttpError(err: any) {
  if (err instanceof AxiosError) {
    log.error(`HTTP error: ${err.response?.status} ${err.response?.statusText}`);
    log.error(`Message: ${err.message}`);
  } else {
    throw err;
  }
}
