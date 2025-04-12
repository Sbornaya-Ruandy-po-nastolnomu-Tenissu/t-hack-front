import {
  useQueries,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { httpClient } from "../httpClient"

type requestMethod = "get" | "post" | "put" | "patch" | "delete"

type ResponseParams = {
  endpoint: string
  method?: requestMethod
  data?: object
}

const fetchData = async <T>({
  endpoint,
  method = "get",
  data,
}: ResponseParams): Promise<T> => {
  const response = await httpClient[method]<T>(endpoint, data)
  return response.data
}

type TypedError = {
  response: {
    data: {
      detail: string
    }
  }
}

export const useFetch = <T, E = TypedError>(
  keys: string[],
  { endpoint, method = "get", data }: ResponseParams,
  options = {} as UseQueryOptions<T, E> | {},
): UseQueryResult<T, E> => {
  return useQuery({
    queryKey: keys,
    queryFn: () => fetchData<T>({ endpoint, method, data }),
    ...options,
  })
}