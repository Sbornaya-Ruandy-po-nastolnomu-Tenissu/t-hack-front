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
import httpClient from "@/shared/api/httpClient"


type Account = {
	id: number,
	type: string, 
	name: string, 
	balance: number
}
const accountsTypes = [
    // DEP subtypes
    { parent_code: 'DEP', code: 'DEP', name: 'Депозитный счёт' },
    { parent_code: 'DEP', code: 'MTL', name: 'Металлический счёт' },
    { parent_code: 'DEP', code: 'SAV', name: 'Накопительный счёт' },
    { parent_code: 'DEP', code: 'ACR', name: 'Аккредитив' },

    // CUR subtypes
    { parent_code: 'CUR', code: 'CUR', name: 'Текущий счёт' },
    { parent_code: 'CUR', code: 'INS', name: 'Счет реструктуризации' },
    { parent_code: 'CUR', code: 'ASC', name: 'Обслуживающий счет займа' },
    { parent_code: 'CUR', code: 'PHX', name: 'Феникс' },

    // MOB subtypes
    { parent_code: 'MOB', code: 'BNK', name: 'Банковский счет для обслуживания мобильного оператора' },
    { parent_code: 'MOB', code: 'BIL', name: 'Счет мобильного оператора' },

    // LON subtypes
    { parent_code: 'LON', code: 'VKR', name: 'Купи в кредит' },
    { parent_code: 'LON', code: 'CLN', name: 'Займ' },
    { parent_code: 'LON', code: 'CAR', name: 'Автокредит' },
    { parent_code: 'LON', code: 'ALR', name: 'Рефинансирование автокредита' },
    { parent_code: 'LON', code: 'SCL', name: 'Кредит наличными под залог' },
    { parent_code: 'LON', code: 'REF', name: 'Кредит наличными на рефинансирование' },
    { parent_code: 'LON', code: 'CLA', name: 'Кредит наличными на покупку авто' },
    { parent_code: 'LON', code: 'MTG', name: 'Ипотека Тинькофф' },
    { parent_code: 'LON', code: 'IND', name: 'Счет индексации задолженности' },
    { parent_code: 'LON', code: 'SLN', name: 'Образовательный кредит' },

    // TCN subtypes
    { parent_code: 'TCN', code: 'GRN', name: 'Технический Green счет', description: 'Счёт для вывода средств с биржи день в день' },
    { parent_code: 'TCN', code: 'TAX', name: 'Технический налоговый счет' },

    // BNP subtypes
    { parent_code: 'BNP', code: 'BNP', name: 'Долями' }
]

const AddAccount = ({ children }: { children: React.ReactNode}) => {

	const [selectAccount, setAccount] = useState("") 
	const [balance, setBalance] = useState("") 
	const [name, setName] = useState("")
	
	const handleSubmit = async () => {
		if (!name || !selectAccount || !balance) {
			toast.error("Все поля обязательные")
			return
		}
		const selected = accountsTypes[Number(selectAccount)]
		
		const res = await httpClient.post("/accounts/create", {
			type: selected.parent_code,
			subtype: selected.code,
			name: selected.name,
			balance: Number(balance)
		})
	}
	
	return (
  	<Dialog>
      <DialogTrigger asChild>
				{ children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Создание счета</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
        	<Input placeholder={"Введите имя счета"} required value={name} onChange={(e: any) => setName(e.target.value)}/>
        	<Input placeholder={"Введите баланс"} required value={balance} onChange={(e: any) => setBalance(e.target.value)}/>
					<Select value={selectAccount} onValueChange={setAccount}>
						<SelectTrigger >
							<SelectValue placeholder={"Мои счета"} />
			      </SelectTrigger>
						<SelectContent>
							<AccountsTypes />
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


const AccountsTypes = () => {
	return (
		<SelectGroup>
			{ accountsTypes.map((accountType, index) =>
				<SelectItem
					value={String(index)}
					key={index}
				>{accountType.name}</SelectItem>
			)}
		</SelectGroup>
	)
}

export { AddAccount } 