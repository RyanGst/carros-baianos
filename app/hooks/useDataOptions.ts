import { SWRConfiguration } from "swr"

export interface UseDataOptions<T> extends SWRConfiguration {
  fallbackData?: T
}
