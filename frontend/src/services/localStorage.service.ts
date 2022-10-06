const AUTH_KEY = 'auth'

export const removeAuthFromStorage = () => {
	localStorage.removeItem(AUTH_KEY)
}

export const setAuthInStorage = (token: string) =>
	localStorage.setItem(AUTH_KEY, JSON.stringify({ access_token: token }))

export const getAuthFromStorage = (): { access_token?: string } =>
	JSON.parse(localStorage.getItem(AUTH_KEY) || '{}')
