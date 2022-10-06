import { resolve } from 'node:path'
import { ConfigModuleOptions } from '@nestjs/config'

export interface EnvDB {
	host: string
	port: number
	name: string
	user: string
	password: string
}
export interface EnvApp {
	port: number
	jwtSecret: string
}
export interface EnvVariables {
	app: EnvApp
	database: EnvDB
}

const envPath = resolve('../.env')

export const configModuleOptions: ConfigModuleOptions = {
	envFilePath: envPath,
	load: [
		(): EnvVariables => ({
			app: {
				port: parseInt(process.env.API_PORT) || 3333,
				jwtSecret: process.env.JWT_SECRET,
			},
			database: {
				host: process.env.POSTGRES_HOST,
				port: parseInt(process.env.POSTGRES_PORT),
				name: process.env.POSTGRES_DB,
				user: process.env.POSTGRES_USER,
				password: String(process.env.POSTGRES_PASSWORD),
			},
		}),
	],
}
