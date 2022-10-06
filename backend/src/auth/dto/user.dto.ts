import { IsString, Length } from 'class-validator'

export class AuthDto {
	@IsString()
	@Length(4)
	login: string

	@IsString()
	@Length(4)
	password: string
}
