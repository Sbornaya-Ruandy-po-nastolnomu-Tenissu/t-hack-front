"use server"
import { 
	Sidebar, 
	SidebarProvider, 
	SidebarTrigger,
	SidebarContent,
	SidebarHeader,
	SidebarGroup,
	SidebarFooter
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const MainPage = async () => {
  return (
    <>
      <SidebarProvider>
     		<Sidebar>
	        <SidebarHeader />
	        <SidebarContent>
	          <SidebarGroup />
	          <SidebarGroup />
	        </SidebarContent>
	        <SidebarFooter />
        </Sidebar>
     		<main>
       		<SidebarTrigger/>
       	</main>
      </SidebarProvider>
    </>
  )
}

export default MainPage;