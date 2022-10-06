import { apiConfig } from '../config/api.config'

export interface Data {
	id: number
	month: string
	store: string
	planTO: number
	planTraffic: number
	planPieces: number
	factTO: number
	factTraffic: number
	factPieces: number
	pieces: number
	TO: number
	traffic: number
}

export interface LoginRes {
	token: string
}

export interface FiltersRes {
	storeFilter: string[]
	monthsFilter: string[]
}

const api = {
	login: async (authData: { login: string; password: string }) => {
		return await apiConfig.post<LoginRes>('auth/login', authData)
	},
	getData: async (filters: Partial<Data>) => {
		return await apiConfig.post<Data[]>('data', filters)
	},
	getFilters: async () => {
		return await apiConfig.get<FiltersRes>('data/filters')
	},
}

export default api
