import { useEffect, useState } from 'react'
import { useFilters } from '../../hooks/useFilters'

import api, { Data } from '../../services/api.service'
import classes from './DataGrid.module.scss'

const commonHeader = [
	'Месяц',
	'Магазин',
	'План ТО',
	'План Трафик',
	'План Штуки',
	'Факт ТО',
	'Факт Трафик',
	'Факт Штуки',
	'Выполнено ТО',
	'Выполнено Трафик',
	'Выполнено Штуки',
]

const headerPlanOnly = ['Месяц', 'Магазин', 'Выполнено ТО', 'Выполнено Трафик', 'Выполнено Штуки']

export const DataGrid = () => {
	const [data, setData] = useState<Data[] | null>(null)
	const filters = useFilters()

	useEffect(() => {
		const month = filters.month === '-' ? undefined : filters.month
		const store = filters.store === '-' ? undefined : filters.store
		api.getData({ month, store }).then((r) => setData(r.data))
	}, [filters])

	const headers = filters.planOnly ? headerPlanOnly : commonHeader

	return (
		<div className={classes.DataGrid}>
			<table className={classes.table}>
				<thead>
					<tr>
						{headers.map((h, idx) => (
							<th key={idx}>{h}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.map((d) => (
						<tr key={d.id}>
							<td>{d.month}</td>
							<td>{d.store}</td>
							{!filters.planOnly && (
								<>
									<td>{d.planTO}</td>
									<td>{d.planTraffic}</td>
									<td>{d.planPieces}</td>
									<td>{d.factTO}</td>
									<td>{d.factTraffic}</td>
									<td>{d.factPieces}</td>
								</>
							)}
							<td>{d.TO}</td>
							<td>{d.traffic}</td>
							<td>{d.pieces}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
