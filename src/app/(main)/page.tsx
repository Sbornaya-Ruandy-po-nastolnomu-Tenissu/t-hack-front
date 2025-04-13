"use client"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { userStore } from "@/entities/user"
import { useEffect } from "react"
import Cookies from "js-cookie"
import httpClient from "@/shared/api/httpClient"

import data from "@/app/data.json"

const MainPage = () => {
	
	const {user, login} = userStore.getState()
	useEffect(() => {
		const token = Cookies.get("token")
		if (!user && !!token) {
			(async () => {
				try {
					const { data } = await httpClient.get("/auth/me")
					const { user } = data
					login(user, token)
				} catch (e) {
					Cookies.remove("token")
				}
			})()
		}
	}, [])
	
  return (
		<div className="flex flex-1 flex-col">
		  <div className="@container/main flex flex-1 flex-col gap-2">
		    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
		      <SectionCards />
		      <div className="px-4 lg:px-6">
		        <ChartAreaInteractive />
		      </div>
		      <DataTable data={data} />
		    </div>
		  </div>
		</div>
  )
}

export default MainPage;