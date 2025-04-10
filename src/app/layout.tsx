import { QueryProvider } from "@/shared/providers/query-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner"
import "./globals.css";

export const metadata: Metadata = {
  title: "T-hack",
  description: "",
  icons: ["icon.svg"]
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return (
		<html lang="en" className={"dark"}>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster position={"top-right"}/>
      </body>
    </html>
  );
}

export default RootLayout;