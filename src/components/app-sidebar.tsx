"use server"

import Link from "next/link"
import {
  IconChartBar,
  IconChartPie,
  IconHome
} from "@tabler/icons-react"
import { Sparkles } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import styles from "./index.module.css"
import clsx from "clsx"

var data = {
  user: {
    name: "me",
    email: "me@example.com",
    avatar: "",
  },
  navMain: [
		{
			title: "На главную",
			url: "/",
			"icon": <IconHome />
		},
    {
      title: "Моя статистика",
      url: "/my-stats",
      icon: <IconChartPie />,
    },
    {
      title: "Общая статистика",
      url: "/all-stats",
      icon: <IconChartBar />,
    },
		{
			title: "AI ассистент",
			url: "/ai-assistant",
			icon: <Sparkles />,
		},
  ]
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-0">
				<SidebarMenu className={clsx("overflow-hidden", styles.brandWrapper)}>
					<SidebarMenuItem className={clsx("overflow-hidden p-3 ml-1", styles.brandContent)}>
						<Link href="/" className={"text-xl font-semibold"}>
              Money Flow
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
