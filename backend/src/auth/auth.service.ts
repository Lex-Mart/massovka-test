import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { AuthDto } from './dto/user.dto'
import { UsersService } from 'src/users/users.service'
import { Users } from 'src/users/entities/users.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async signin(authDto: AuthDto) {
		const user = await this.validateUser(authDto)
		return await this.generateToken(user)
	}

	async signup(authDto: AuthDto) {
		const user = await this.userService.findByLogin(authDto.login)
		if (user) {
			throw new BadRequestException('User already exist')
		}
		const hashedPassword = await bcrypt.hash(authDto.password, 5)
		const newUser = await this.userService.createUser({
			...authDto,
			name: 'user',
			password: hashedPassword,
		})
		const token = await this.generateToken(newUser)
		return token
	}

	private async generateToken(user: Users) {
		const payload = { name: user.name, id: user.id }
		return {
			token: this.jwtService.sign(payload),
		}
	}

	private async validateUser(authDto: AuthDto) {
		const user = await this.userService.findByLogin(authDto.login)
		console.log({ user })
		if (!user) {
			throw new BadRequestException('User not found')
		}
		const passwordEquals = await bcrypt.compare(authDto.password, user.password)
		console.log({ passwordEquals })
		if (!passwordEquals) {
			throw new UnauthorizedException('Wrong password')
		}
		return user
	}
}
