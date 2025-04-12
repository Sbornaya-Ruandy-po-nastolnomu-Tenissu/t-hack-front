import { create } from "zustand"
import Cookies from "js-cookie"

type User = {
	login: string,
	email:string,
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