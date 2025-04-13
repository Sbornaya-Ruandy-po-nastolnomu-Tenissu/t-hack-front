"use server"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

type Props = {
	title: string
	url: string
	icon?: React.ReactNode
}

export async function NavMain({items}: { items: Props[] }) {
  return (
    <SidebarGroup>
    	
    	
    
    	
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