import { QueryProvider } from "@/shared/providers/query-provider";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import type { Metadata } from "next";
import { Toaster } from "sonner"
import "./globals.css";

export const metadata: Metadata = {
  title: "T-hack",
  description: "",
  icons: ["/icon.svg"]
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return (
		<html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
        	<ThemeProvider 
         		attribute={"class"}
          	defaultTheme={"system"}
           	enableSystem
         	>
          	{children}
         	</ThemeProvider>
        </QueryProvider>
        <Toaster position={"top-right"}/>
      </body>
    </html>
  );
}

export default RootLayout;