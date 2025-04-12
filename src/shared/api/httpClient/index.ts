import axios from "axios"
import Cookies from "js-cookie"
export var API_URL = "http://192.168.228.8:8080"

type Responce = {
	endpoint: string,
	method?: "get" | "post" | "put" | "delete" | "patch",
	body?: object
}

export const httpClient = axios.create({
  withCredentials: false,
  baseURL: API_URL + "/api",
})

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`
  return config
})

export default httpClient
