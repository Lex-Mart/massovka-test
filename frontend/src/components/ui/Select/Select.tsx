import { FC } from 'react'

import classes from './Select.module.scss'

export const Select: FC<
	React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
> = (props) => {
	return (
		<select {...props} className={classes.Select}>
			{props.children}
		</select>
	)
}
