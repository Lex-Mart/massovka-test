import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Data {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'Месяц' })
	month: string

	@Column({ name: 'Магазин' })
	store: string

	@Column({ name: 'План ТО' })
	planTO: number

	@Column({ name: 'План Трафик' })
	planTraffic: number

	@Column({ name: 'План Штуки' })
	planPieces: number

	@Column({ name: 'Факт ТО' })
	factTO: number

	@Column({ name: 'Факт Трафик' })
	factTraffic: number

	@Column({ name: 'Факт Штуки' })
	factPieces: number
}
