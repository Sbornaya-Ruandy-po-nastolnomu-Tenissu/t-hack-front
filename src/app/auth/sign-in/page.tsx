"use server"
import { LoginForm } from "@/components/login-form"
export default async function SignInPage() {
  return <LoginForm mode={"sign-in"}/>
}
