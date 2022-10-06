import { FC } from 'react'
import classes from './Button.module.scss'

export const Button: FC<
	React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
	return (
		<button {...props} className={classes.Button}>
			{props.children}
		</button>
	)
}
