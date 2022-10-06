import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	getAuthFromStorage,
	removeAuthFromStorage,
	setAuthInStorage,
} from '../services/localStorage.service'

export interface IAuthContext {
	user: {
		token: string | null
		isAuthorized: boolean
	}
	login: ({ token }: { token: string }) => void
	logout: () => void
}
export const AuthContext = createContext<IAuthContext>({
	user: {
		token: null,
		isAuthorized: false,
	},
	login: () => {},
	logout: () => {},
})

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [user, setUser] = useState<IAuthContext['user']>(() => {
		const { access_token } = getAuthFromStorage()
		if (access_token) {
			return { isAuthorized: true, token: access_token }
		}
		return { isAuthorized: false, token: null }
	})

	const navigate = useNavigate()

	const login = ({ token }: { token: string }) => {
		setAuthInStorage(token)
		setUser({ isAuthorized: true, token })
		navigate('/cabinet')
	}

	const logout = () => {
		removeAuthFromStorage()
		setUser({ isAuthorized: false, token: null })
		navigate('/login')
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const value = useMemo(() => ({ user, login, logout }), [user])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
