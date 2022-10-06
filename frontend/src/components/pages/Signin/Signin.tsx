import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'

import { useAuth } from '../../../hooks/useAuth'
import { LoginForm } from '../../LoginForm/LoginForm'
import classes from './Signin.module.scss'
import { useEffect } from 'react'

export const Signin = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (auth.user.isAuthorized) {
			navigate('/cabinet')
		}
	}, [auth.user.isAuthorized, navigate])

	return (
		<div className={classnames('container', classes.Signin)}>
			<LoginForm />
		</div>
	)
}
