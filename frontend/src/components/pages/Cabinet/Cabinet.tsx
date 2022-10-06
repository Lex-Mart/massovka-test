import { FiltersProvider } from '../../../providers/FiltersProvider'
import { DataGrid } from '../../DataGrid/DataGrid'
import { Filters } from '../../Filters/Filters'

export const Cabinet = () => {
	return (
		<FiltersProvider>
			<div className='container'>
				<Filters />
				<DataGrid />
			</div>
		</FiltersProvider>
	)
}
