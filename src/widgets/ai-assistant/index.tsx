"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import clsx from "clsx"
import styles from "./index.module.css"
import { SendHorizonal } from "lucide-react"
import { httpClient } from "@/shared/api/httpClient"
import { ChangeEvent, useState } from "react"
import { toast } from "sonner"

export const AiInput = ({ setNewMsg }: { setNewMsg: (v: string) => void }) => {
	const [query, setQuery] = useState<string>("")
	const [isLoading, setLoading] = useState<boolean>(false)
	
	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setQuery(event.target.value)
	}
	
	const send = async () => {
		if (isLoading) return;
		try {
			setLoading(true)
			setNewMsg(query)
			setQuery("")
			const { data } = await httpClient.post("/ai", { text: query })
			setNewMsg(data.text)
			setLoading(false)
		} catch (e: any) {
			toast.error(e.message)
		}
	}
	
	const handleEnter = (event: any) => {
		if (event.code === "Enter") {
			event.preventDefault()
			send();
		} 
	}
	
	const handleClick = () => {
		if (!query) return;
		send();
	}

	
	return (
		<div className={clsx(styles.input)}>
			<div className={clsx(styles.wrapper)}>
		  <Textarea placeholder="Введите ваше сообщение здесь..." className="overflow-scroll pr-12" 
							onChange={handleChange} value={query} onKeyUp={handleEnter}/>
				<SendHorizonal className={styles.send} onClick={handleClick}/>
		</div>
    </div>
	)
}