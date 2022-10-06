import { useState } from 'react'
import classnames from 'classnames'

import api from '../../services/api.service'
import { Button } from '../ui/Button/Button'
import { Input } from '../ui/Input/Input'
import classes from './LoginForm.module.scss'
import { useAuth } from '../../hooks/useAuth'

export const LoginForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [authError, setAuthError] = useState(false)
	const auth = useAuth()

	const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		setAuthError(false)
		e.preventDefault()

		try {
			const res = await api.login({ login, password })
			auth.login({ token: res.data.token })
		} catch (error) {
			auth.logout()
			setAuthError(true)
		}
	}

	return (
		<div className={classes.formWrapper}>
			<p className={classes.title}>Вход</p>
			<form className={classnames(classes.form, { [classes.error]: authError })}>
				<Input
					type='text'
					placeholder='Логин'
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<Input
					type='text'
					placeholder='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button onClick={onSubmit} type='submit'>
					Войти
				</Button>
			</form>
		</div>
	)
}
