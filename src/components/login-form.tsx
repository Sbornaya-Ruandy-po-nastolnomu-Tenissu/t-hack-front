"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { login } from "@/features/auth"
import { useState } from "react"
import { toast } from "sonner"

export function LoginForm({
	mode,
	className,
	...props
}: React.ComponentProps<"form"> & 
{
	mode: "sign-up" | "sign-in"
}) {
	const router = useRouter()
	const changeMode = () => {
		const otherMode = mode === "sign-in" ? "sign-up" : "sign-in"
		router.push(`/auth/${otherMode}`)
	}
	
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	
	const changeEmail = (event: any) => setEmail(event.target.value)
	const changePassword = (event: any) => setPassword(event.target.value)
	
	const handleSubmit = () => {
		if (!email || !password) {
			toast.error("Все поля должны быть заполнены")
			return
		}
		login(email, password, mode)
			.then(() => {
				router.push("/")
			})
			.catch((e) => {
				toast.error(String(e))
			})
	}
	
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">{ mode === "sign-in" ? "Войти в аккаунт" : "Зарегистрировать новый аккаунт" }</h1>
        <p className="text-muted-foreground text-sm text-balance">
					{ mode === "sign-in" ? "Введите ваш email ниже, чтобы войти в аккаунт" : null}
					{ mode === "sign-up" ? "Введите ваш email, чтобы зарегистрировать аккаунт" : null }
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Логин</Label>
					<Input id="email" placeholder="m@example.com" required onChange={changeEmail} value={email}/>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
          </div>
					<Input id="password" type="password" required value={password} onChange={changePassword}/>
        </div>
				<Button className="w-full cursor-pointer" type={"button"} onClick={handleSubmit}>
					{ mode === "sign-up" ? "Зарегистрироваться" : "Войти"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
						{ mode === "sign-up" ? "Есть аккаунт?" : "Ещё нет аккаунта?"}
          </span>
        </div>
      </div>
      <div className="text-center text-sm" onClick={changeMode}>
				<span className="underline underline-offset-4 cursor-pointer select-none">
					{ mode === "sign-up" ? "Войти" : "Зарегистрироваться"}
        </span>
      </div>
    </form>
  )
}
