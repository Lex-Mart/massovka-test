import { useEffect, useState } from 'react'
import { useFilters } from '../../hooks/useFilters'
import api, { FiltersRes } from '../../services/api.service'

import { Select } from '../ui/Select/Select'
import classes from './Filters.module.scss'

export const Filters = () => {
	const [filters, setFilters] = useState<FiltersRes | null>(null)
	const { month, planOnly, store, setFilter } = useFilters()

	useEffect(() => {
		api.getFilters().then((res) => setFilters(res.data))
	}, [])

	return (
		<div className={classes.Filters}>
			<p className={classes.title}>Фильтры</p>
			<div className={classes.filterGroup}>
				<label className={classes.filter}>
					Месяц:{' '}
					<Select value={month} onChange={(e) => setFilter('month', e.target.value)}>
						<option value='-'>-</option>
						{filters?.monthsFilter.map((f, idx) => (
							<option key={idx} value={f}>
								{f}
							</option>
						))}
					</Select>
				</label>
				<label className={classes.filter}>
					Магазин:{' '}
					<Select value={store} onChange={(e) => setFilter('store', e.target.value)}>
						<option value='-'>-</option>
						{filters?.storeFilter.map((s, idx) => (
							<option key={idx} value={s}>
								{s}
							</option>
						))}
					</Select>
				</label>
				<label>
					Только выполнение плана:{' '}
					<input
						type='checkbox'
						checked={planOnly}
						onChange={() => setFilter('planOnly', !planOnly)}
					/>
				</label>
			</div>
		</div>
	)
}
