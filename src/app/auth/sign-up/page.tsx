"use server"
import { LoginForm } from "@/components/login-form"
export default async function SignUpPage() {
  return <LoginForm mode={"sign-up"}/>
}
