import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	signin(@Body() authDto: AuthDto) {
		return this.authService.signin(authDto)
	}
}
