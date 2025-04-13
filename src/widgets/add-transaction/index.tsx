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


type Account = {
	id: number,
	type: string, 
	name: string, 
	balance: number
}

const AddTransaction = ({ children }: { children: React.ReactNode}) => {

	const [selectAccount, setAccount] = useState("") 
	const [category, setCategory] = useState("")
	const [cashback, setCashback] = useState("")
	const { data } = useFetch<Account[]>(["accounts"], {
		endpoint: "/accounts/my",
		method: "get"
	})
	
	const handleSubmit = () => {
		if (!category || !cashback || !selectAccount) {
			toast.error("Все поля обязательные")
			return
		}
		
	}
	
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
        	<Input placeholder={"Введите категорию"} required value={category} onChange={(e: any) => setCategory(e.target.value)}/>
        	<Input placeholder={"Введите кэшбэк"} required value={cashback} onChange={(e: any) => setCashback(e.target.value)}/>
					<Select value={selectAccount} onValueChange={setAccount}>
						<SelectTrigger >
							<SelectValue placeholder={"Мои счета"} />
			      </SelectTrigger>
						<SelectContent>
							<AccountsList myAccounts={data}/>
						</SelectContent>
					</Select>
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

const AccountsList = ({ myAccounts }: { myAccounts: Account[] | undefined }) => {
	if (myAccounts === undefined) return (
		<AddAccount>
			<SelectItem
				value={"Создать"}
			>
					Создать
			</SelectItem>
		</AddAccount>
	)
	return (
		<SelectGroup>
			{myAccounts.length > 0 ? myAccounts.map((account, index) =>
				<SelectItem
					value={account.name}
					key={index}
				>{account.name}</SelectItem>
			) : (
				<AddAccount>
					<SelectItem
						value={"Создать"}
					>
							Создать
					</SelectItem>
				</AddAccount>
			)}
		</SelectGroup>
	)
}

export { AddTransaction } 