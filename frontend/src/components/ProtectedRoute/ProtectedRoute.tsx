import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const ProtectedRoute: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { user } = useAuth()
	if (!user.isAuthorized) {
		return <Navigate to='/login' />
	}
	return <>{children}</>
}
