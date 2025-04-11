"use client"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import styles from "./index.module.css"

const Wrapper = ({ children, contentType }: {children: React.ReactNode, contentType: "image" | "content"}) => {
	const path = usePathname()
	const swap = path.startsWith("/auth/sign-up")
	if (contentType === "content") {
		return (
			<div className={clsx(styles.content, swap ? styles.swapped : null, "w-screen lg:w-1/2 lg:h-screen")}>
				{children}
			</div>
		)
	}
	return (
		<div className={clsx(styles.image, swap ? styles.swapped : null, "w-1/2 h-screen hidden lg:block")}>
			{ children }
		</div>
	)
}

export { Wrapper }