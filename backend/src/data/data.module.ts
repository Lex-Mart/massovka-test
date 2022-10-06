import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DataService } from './data.service'
import { Data } from './entities/data.entity'
import { DataController } from './data.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([Data]), AuthModule],
	providers: [DataService],
	controllers: [DataController],
	exports: [DataService],
})
export class DataModule {}
