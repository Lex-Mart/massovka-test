import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

export const NotFound = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			if (auth.user.isAuthorized) {
				return navigate('/cabinet')
			}
			navigate('/login')
		}, 3000)
	}, [navigate, auth])

	return <div>NOT FOUND 404</div>
}
