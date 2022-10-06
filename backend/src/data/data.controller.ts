import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { DataService } from './data.service'
import { DataFiltersDto } from './dto/data-filters.dto'

@Controller('data')
export class DataController {
	constructor(private readonly dataService: DataService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	data(@Body() filtersDto: DataFiltersDto) {
		return this.dataService.getDataByFilters(filtersDto)
	}

	@Get('filters')
	@UseGuards(JwtAuthGuard)
	filters() {
		return this.dataService.dataFilters()
	}
}
