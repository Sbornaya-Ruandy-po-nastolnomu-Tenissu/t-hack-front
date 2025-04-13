import { userStore } from "@/entities/user";
import { API_URL } from "@/shared/api/httpClient";
import axios from "axios";

export async function fn(code: string) {
	try {
		const { data } = await axios.post(API_URL + `/auth/code`, { code: Number(code) })
		
		const { user, token } = data
		userStore.getState().login(user, token)
	}
	catch (e: any) {
		throw e.message
	}
}