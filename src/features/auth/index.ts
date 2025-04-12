import { userStore } from "@/entities/user";
import { API_URL } from "@/shared/api/httpClient";
import axios from "axios";

export async function login(email: string, password: string, point: string) {
	try {
		const { data } = await axios.post(API_URL + `/auth/${point}`, { login: email, password })
		
		const { user, token } = data
		userStore.getState().login(user, token)
	}
	catch (e: any) {
		throw e.message
	}
}