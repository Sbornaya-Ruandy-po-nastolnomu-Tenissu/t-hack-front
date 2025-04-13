"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { fn } from "./fn"
import { useState } from "react"
import { toast } from "sonner"

export default function TestPage() {
	const router = useRouter()
	const mode = "sign-in"
	const [code, setCode] = useState<string>("")
	
	const changeCode = (event: any) => setCode(event.target.value)

	
	const handleSubmit = () => {
		if (!code) {
			toast.error("Все поля должны быть заполнены")
			return
		}
		fn(code)
			.then(() => {
				router.push("/")
			})
			.catch((e) => {
				toast.error(String(e))
			})
	}
	
  return (
    <form className={cn("flex flex-col gap-6")} >
      <div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">{ mode === "sign-in" ? "Log in to your account" : "Register new account" }</h1>
        <p className="text-muted-foreground text-sm text-balance">
					{ mode === "sign-in" ? "Enter your email below to login to your account" : null}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Код</Label>
					<Input id="email" placeholder="m@example.com" required onChange={changeCode} value={code}/>
        </div>
				<Button className="w-full cursor-pointer" type={"button"} onClick={handleSubmit}>
					{ "Войти"}
        </Button>
      </div>
    </form>
  )
}
