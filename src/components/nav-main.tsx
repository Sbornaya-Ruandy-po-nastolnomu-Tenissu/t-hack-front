"use server"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./ui/button"
import { CirclePlus } from "lucide-react"
import { AddTransaction } from "@/widgets/add-transaction"

type Props = {
	title: string
	url: string
	icon?: React.ReactNode
}

export async function NavMain({items}: { items: Props[] }) {
  return (
    <SidebarGroup>
    	
    	<AddTransaction>
	  		<SidebarMenuItem className="flex items-center gap-2 mb-2">
	        <SidebarMenuButton
	          tooltip="Создать транзакцию"
	          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
	        >
	        	<CirclePlus />
	          <span>Создать транзакцию</span>
	        </SidebarMenuButton>
	      </SidebarMenuItem>
     	</AddTransaction>
      
    	
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item, index) => <ListItem item={item} key={index}/>)}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const ListItem = async ({ item }: { item: Props }) => {
	return (
		<Link href={item.url}>
			<SidebarMenuItem>
        <SidebarMenuButton>
          {item.icon}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
	)
}