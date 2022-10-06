import { useContext } from 'react'
import { FiltersContext } from '../providers/FiltersProvider'

export const useFilters = () => {
	return useContext(FiltersContext)
}
