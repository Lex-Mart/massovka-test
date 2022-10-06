import { FC } from 'react'

import classes from './Input.module.scss'

export const Input: FC<
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
	return (
		<input {...props} className={classes.Input}>
			{props.children}
		</input>
	)
}
