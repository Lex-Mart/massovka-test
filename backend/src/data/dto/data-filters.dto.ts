import { IsString, IsNumber, IsOptional } from 'class-validator'

export class DataFiltersDto {
	@IsOptional()
	@IsNumber()
	id?: number

	@IsOptional()
	@IsString()
	month: string

	@IsOptional()
	@IsString()
	store?: string

	@IsOptional()
	@IsNumber()
	planTO?: number

	@IsOptional()
	@IsNumber()
	planTraffic?: number

	@IsOptional()
	@IsNumber()
	planPieces?: number

	@IsOptional()
	@IsNumber()
	factTO?: number

	@IsOptional()
	@IsNumber()
	factTraffic?: number

	@IsOptional()
	@IsNumber()
	factPieces?: number
}
