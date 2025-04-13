"use client"

import {
  IconDotsVertical,
  IconLogout,
  IconLogin,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { userStore } from "@/entities/user"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import httpClient from "@/shared/api/httpClient"

export function NavUser() {
  const { isMobile } = useSidebar()
	const {user, logout, login} = userStore.getState()
  const [userData, setUserData] = useState(user)
	
	const handleLogout = () => {
		logout()
		setUserData(null)
	}
	
	useEffect(() => {
		const token = Cookies.get("token")
		if (!user && !!token) {
			(async () => {
				try {
					const { data } = await httpClient.get("/auth/me")
					const { user } = data
					login(user, token)
					setUserData(user)
				} catch (e) {
					Cookies.remove("token")
				}
			})()
		}
	}, [])

	if (!userData) return (
		<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >	
           		<div className="ml-1">
								<IconLogin stroke={1} />
             	</div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
							<Link href={"/auth/sign-in"}>
								<DropdownMenuItem>
                	Войти
              	</DropdownMenuItem>
							</Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            	<Link href={"/auth/sign-up"}>
             		<DropdownMenuItem>
             			Зарегистрироваться
               </DropdownMenuItem>
             	</Link>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </SidebarMenuItem>
    </SidebarMenu>
  )
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* <AvatarImage src={user.avatar} alt={user.login} /> */}
                <AvatarFallback className="rounded-lg">T</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userData.id}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userData.id}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.login} /> */}
                  <AvatarFallback className="rounded-lg">T</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userData.id}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userData.id}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            
              <DropdownMenuItem>
                <IconUserCircle />
                Аккаунт
              </DropdownMenuItem>
            
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
