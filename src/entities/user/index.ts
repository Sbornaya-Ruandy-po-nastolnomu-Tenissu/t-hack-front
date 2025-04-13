import { create } from "zustand"
import Cookies from "js-cookie"

type User = {
	id: number,
	gender?: "MALE" | "FEMALE",
	age?: number,
	income?: number 
}

type UserState = {
	token: string | null,
	user: User | null,
	login: (user: User, token: string) => void,
	logout: () => void,
}

export const userStore = create<UserState>()((set, get) => ({
	token: Cookies.get("token") || null,
	user: null,
	login: (user: User, token: string) => {
		Cookies.set("token", token)
		set({ token, user })
	},
	logout: () => {
		Cookies.remove("token")
		set({ token: null, user: null })
	}
}))