import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'

import { isDev } from 'src/helpers/mode'
import { EnvDB, EnvVariables } from './env.config'

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (config: ConfigService<EnvVariables>) => {
		const dbConf = config.get<EnvDB>('database')
		return {
			type: 'postgres',
			host: dbConf.host,
			port: dbConf.port,
			username: dbConf.user,
			password: dbConf.password,
			database: dbConf.name,
			autoLoadEntities: true,
			synchronize: isDev,
		}
	},
}
