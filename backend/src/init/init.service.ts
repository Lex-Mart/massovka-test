import * as fs from 'node:fs'
import * as path from 'node:path'
import { Injectable } from '@nestjs/common'
import * as iconv from 'iconv-lite'
import * as csv from 'fast-csv'
import { DataService } from 'src/data/data.service'
import { Data } from 'src/data/entities/data.entity'
import { UsersService } from 'src/users/users.service'
import { AuthService } from 'src/auth/auth.service'

interface CSVData {
	month: string
	store: string
	planTO: string
	planTraffic: string
	planPieces: string
	factTO: string
	factTraffic: string
	factPieces: string
}

const toNum = (str: string) => Number(str.replaceAll(' ', ''))

@Injectable()
export class InitService {
	constructor(
		private readonly dataService: DataService,
		private readonly userService: UsersService,
		private readonly authService: AuthService
	) {}

	async initData() {
		const hasData = await this.dataService.hasData()
		if (hasData) return

		const dataFromCSV = await this.readDataFromMockCSV()
		await this.dataService.insertData(...dataFromCSV)
	}

	async InitAdmin() {
		const admin = await this.userService.findByLogin('admin')
		if (!admin) await this.authService.signup({ login: 'admin', password: 'admin' })
	}

	private readDataFromMockCSV(): Promise<Partial<Data>[]> {
		return new Promise((resolve, reject) => {
			const data: Data[] = []
			const pathToData = path.resolve('src', 'mockData', 'data.csv')

			const converterStream = iconv.decodeStream('win1251')
			const decodedStream = fs.createReadStream(pathToData).pipe(converterStream)
			csv.parseStream<CSVData, Data>(decodedStream, {
				headers: [
					'month',
					'store',
					'planTO',
					'planTraffic',
					'planPieces',
					'factTO',
					'factTraffic',
					'factPieces',
				],
				renameHeaders: true,
				delimiter: ';',
				trim: true,
			})
				.transform(
					(data: CSVData): Partial<Data> => ({
						...data,
						factPieces: toNum(data.factPieces),
						factTO: toNum(data.factTO),
						factTraffic: toNum(data.factTraffic),
						planPieces: toNum(data.planPieces),
						planTO: toNum(data.planTO),
						planTraffic: toNum(data.planTraffic),
					})
				)
				.on('data', (chunk) => data.push(chunk))
				.on('error', (err) => reject(err))
				.on('end', () => resolve(data))
		})
	}
}
