import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Users } from './entities/users.entity'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

	async createUser(user: { name: string; login: string; password: string }) {
		return await this.usersRepository.save(user)
	}

	async findByLogin(login: string) {
		const user = await this.usersRepository.findOne({ where: { login } })
		return user
	}
}
