import useSWR from "swr"
import { UseDataOptions } from "@/hooks/useDataOptions"

export function useData<T>(
  key: string,
  fetcher: (url: string) => Promise<T>,
  options?: UseDataOptions<T>,
) {
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, options)

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    isEmpty: !error && !data,
    mutate,
  }
}
