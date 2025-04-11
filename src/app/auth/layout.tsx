"use server"
import { placeholder } from "@/shared/ui/auth/placeholder-image"
import { Wrapper } from "@/widgets/auth/wrapper"
import Link from "next/link"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	
	return (
		<>	
			<div className="grid min-h-svh lg:grid-cols-2 select-none">
				<Wrapper contentType={"content"}>
					<div className={`flex flex-col gap-4 p-6 md:p-10 h-full`}>
						<Link className="flex justify-start gap-2 cursor-pointer text-xl w-auto" href="/">
							Money Flow
						</Link>
						<div className="flex flex-1 items-center justify-center">
							<div className="w-full max-w-xs">
								{ children }
							</div>
						</div>
					</div>
				</Wrapper>
				
				<Wrapper contentType={"image"}>
					<div className="relative w-full h-full">
						<img
							src={placeholder}
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
							/>
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default AuthLayout