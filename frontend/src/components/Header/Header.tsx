import classnames from 'classnames'
import { useAuth } from '../../hooks/useAuth'

import { Button } from '../ui/Button/Button'
import classes from './Header.module.scss'

export const Header = () => {
	const auth = useAuth()

	const logoutHandler = () => {
		auth.logout()
	}

	return (
		<header className={classes.Header}>
			<div className={classnames('container', { [classes.content]: auth.user.isAuthorized })}>
				<span className={classes.logo}>MASSOVKA</span>
				{auth.user.isAuthorized && (
					<Button onClick={logoutHandler} style={{ backgroundColor: '#ffffff' }}>
						Выйти
					</Button>
				)}
			</div>
		</header>
	)
}
