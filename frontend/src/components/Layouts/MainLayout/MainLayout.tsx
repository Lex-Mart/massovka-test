import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Header } from '../../Header/Header'
import { AuthProvider } from '../../../providers/AuthProvider'
import { useAuth } from '../../../hooks/useAuth'
import routes from '../../../config/routes.config'
import { useEffect } from 'react'

export const MainLayout = () => {
	const auth = useAuth()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (location.pathname === routes.root) {
			if (auth.user.isAuthorized) navigate('/cabinet')
			if (!auth.user.isAuthorized) navigate('/login')
		}
	}, [auth.user.isAuthorized, location.pathname, navigate])

	return (
		<>
			<AuthProvider>
				<Header />
				<Outlet />
			</AuthProvider>
		</>
	)
}
