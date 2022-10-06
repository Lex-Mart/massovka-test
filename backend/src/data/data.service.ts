import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Data } from './entities/data.entity'
import { DataFiltersDto } from './dto/data-filters.dto'

@Injectable()
export class DataService {
	constructor(@InjectRepository(Data) private readonly dataRepository: Repository<Data>) {}

	async dataFilters() {
		const stores = await this.dataRepository
			.createQueryBuilder('data')
			.select('DISTINCT(data.store)')
			.getRawMany()
		const months = await this.dataRepository
			.createQueryBuilder('data')
			.select('DISTINCT(data.month)')
			.getRawMany()

		return {
			storeFilter: stores.map((s) => Object.values(s)[0]).sort(),
			monthsFilter: months.map((m) => Object.values(m)[0]).sort(),
		}
	}

	async getDataByFilters(filters?: DataFiltersDto) {
		const data = await this.dataRepository.find({ where: filters, order: { id: 'ASC' } })
		console.log(data, filters)
		const calculatedData = data.map((d) => ({
			...d,
			pieces: d.factPieces / d.planPieces,
			TO: d.factTO / d.planTO,
			traffic: d.factTraffic / d.planTraffic,
		}))
		return calculatedData
	}

	async insertData(...data: Partial<Data>[]) {
		await this.dataRepository.save(data)
	}

	async hasData() {
		const data = await this.dataRepository.find({ take: 1 })
		if (data.length) return true
		return false
	}
}
