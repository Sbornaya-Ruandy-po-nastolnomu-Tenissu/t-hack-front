"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

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
	
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">{ mode === "sign-in" ? "Log in to your account" : "Register new account" }</h1>
        <p className="text-muted-foreground text-sm text-balance">
					{ mode === "sign-in" ? "Enter your email below to login to your account" : null}
					{ mode === "sign-up" ? "Enter your email to register account" : null }
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
					{ mode === "sign-up" ? "Sign up" : "Sign in"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
						{ mode === "sign-up" ? "Have an accaunt?" : "Don't have an accaunt?"}
          </span>
        </div>
      </div>
      <div className="text-center text-sm" onClick={changeMode}>
				<span className="underline underline-offset-4 cursor-pointer select-none">
					{ mode === "sign-up" ? "Sign In" : "Sign Up"}
        </span>
      </div>
    </form>
  )
}
