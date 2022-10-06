import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 20 })
	name: string

	@Column({ type: 'varchar', length: 20 })
	login: string

	@Column({ type: 'text' })
	password: string
}
