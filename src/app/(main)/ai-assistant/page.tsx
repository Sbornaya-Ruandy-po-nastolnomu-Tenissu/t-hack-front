"use client"
import styles from "./index.module.css"
import clsx from "clsx";
import { AiInput } from "@/widgets/ai-assistant";
import { useState } from "react";

const AssistantPage = () => {
	const [msgs, setMsgs] = useState<string[]>([])
	
	const changeMsg = (value: string) => {
		setMsgs(prev => prev.concat(value))
	}
	
	return (
		<main className={clsx(styles.chat)}>
			<ul>
				{msgs.map((msg, index) => <li key={index}>{msg}</li>)}
			</ul>
			<AiInput setNewMsg={changeMsg} />
		</main>
	)
}

export default AssistantPage;