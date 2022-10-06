import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { EnvApp, EnvVariables } from 'src/configs/env.config'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './autth.controller'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService<EnvVariables>) => ({
				secret: config.get<EnvApp>('app').jwtSecret,
				signOptions: { expiresIn: '15d' },
			}),
		}),
		UsersModule,
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
