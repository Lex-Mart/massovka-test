import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeOrmOptions } from './configs/database.config'
import { configModuleOptions } from './configs/env.config'
import { UsersModule } from './users/users.module'
import { DataModule } from './data/data.module'
import { InitModule } from './init/init.module';

@Module({
	imports: [
		ConfigModule.forRoot(configModuleOptions),
		TypeOrmModule.forRootAsync(typeOrmOptions),
		AuthModule,
		UsersModule,
		DataModule,
		InitModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
