"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AddAccount } from "../add-account"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useFetch } from "@/shared/api/queryClient"
import { userStore } from "@/entities/user"
import httpClient from "@/shared/api/httpClient"


type Account = {
	id: number,
	type: string, 
	name: string, 
	balance: number
}

const AddTransaction = ({ children }: { children: React.ReactNode}) => {

	const user = userStore.getState().user
	const [amount, setAmount] = useState("")
	const [selectAccount, setAccount] = useState("") 
	const [category, setCategory] = useState("")
	const [cashback, setCashback] = useState("")
	const { data } = useFetch<Account[]>(["accounts"], {
		endpoint: "/accounts/my",
		method: "get"
	})
	
	const handleSubmit = async () => {
		if (!category || !cashback || !selectAccount || !amount) {
			toast.error("Все поля обязательные")
			return
		}
		const res = await httpClient.post("/transactions/create", { 
			account_id: selectAccount,
			amount: amount
	 })
	}
	
	if (!user) return <></>
	
	return (
  	<Dialog>
      <DialogTrigger asChild>
				{ children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Создание транзакции</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
        	<Input placeholder={"Введите сумму"} required value={amount} onChange={(e: any) => setAmount(e.target.value)}/>
        	<Input placeholder={"Введите категорию"} required value={category} onChange={(e: any) => setCategory(e.target.value)}/>
        	<Input placeholder={"Введите кэшбэк"} required value={cashback} onChange={(e: any) => setCashback(e.target.value)}/>
					{ (data === undefined || data.length === 0) ? 
						(<AddAccount>
							<Button>
								Создать
							</Button>
						</AddAccount>) : null
					}
					
					{(data !== undefined && data.length > 0) ?
						(<Select value={selectAccount} onValueChange={setAccount}>
							<SelectTrigger >
								<SelectValue placeholder={"Мои счета"} />
							</SelectTrigger>
							<SelectContent>
								<AccountsList myAccounts={data as Account[]} />
							</SelectContent>
						</Select>) : null
					}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleSubmit}>
           	Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	)
}

const AccountsList = ({ myAccounts }: { myAccounts: Account[] }) => {
	return (
		<SelectGroup>
			{myAccounts.map((account, index) =>
				<SelectItem
					value={String(account.id)}
					key={index}
				>{account.name}</SelectItem>
			)}
		</SelectGroup>
	)
}

export { AddTransaction } 