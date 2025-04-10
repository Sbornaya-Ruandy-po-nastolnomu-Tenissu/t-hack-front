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
       		<SidebarTrigger />
       	</main>
      </SidebarProvider>
    </>
  )
}

export default MainPage;