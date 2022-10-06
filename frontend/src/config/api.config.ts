import axios from 'axios'

import { getAuthFromStorage } from '../services/localStorage.service'

const baseUrl = `http://${window.location.hostname}:3001`

export const apiConfig = axios.create({
	baseURL: baseUrl,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

apiConfig.interceptors.request.use((req) => {
	const { access_token } = getAuthFromStorage()
	if (access_token && req.headers) {
		req.headers.authorization = `Bearer ${access_token}`
	}
	return req
})
