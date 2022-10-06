import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react'

export interface Filters {
	month: string
	store: string
	planOnly: boolean
}

export type FiltesWithFn = Filters & {
	setFilter: <T extends keyof Filters>(filter: T, value: Filters[T]) => void
}

export const FiltersContext = createContext<FiltesWithFn>({
	month: '-',
	store: '-',
	planOnly: false,
	setFilter: () => {},
})

export const FiltersProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [filters, setFilters] = useState<Filters>({
		month: '-',
		store: '-',
		planOnly: false,
	})

	const setFilter = <T extends keyof Omit<Filters, 'setFilter'>>(
		filter: T,
		value: Filters[T]
	) => {
		setFilters((prev) => ({ ...prev, [filter]: value }))
	}

	const value = useMemo(() => ({ ...filters, setFilter }), [filters])

	return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}
