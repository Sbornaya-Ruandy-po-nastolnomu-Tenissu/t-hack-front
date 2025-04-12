"use client"
import styles from "./index.module.css"
import clsx from "clsx";
import { AiInput } from "@/widgets/ai-assistant";
import { useState } from "react";

const AssistantPage = () => {
	const [msgs, setMsgs] = useState<string[]>([
		"привет хочу сделать большую покупку, стоит ли мне брать телевизор в рассрочку", "hello i'm your AI assistant я не могу тебе помочь с этим вопросом", "pensil"
	])
	
	const changeMsg = (value: string) => {
		setMsgs(prev => prev.concat(value))
	}
	
	return (
		<main className={clsx(styles.chat)}>
			<ul className="gap-4">
				{msgs.map((msg, index) => (
					<li key={index} className="bg-muted p-3 text-sm rounded-lg max-w-3/4 lg:max-w-5/12">
						<span>
							{msg}
						</span>
					</li>
				))}
			</ul>
			<AiInput setNewMsg={changeMsg} />
		</main>
	)
}

export default AssistantPage;