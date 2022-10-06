import { Module, OnModuleInit } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { DataModule } from 'src/data/data.module'
import { UsersModule } from 'src/users/users.module'
import { InitService } from './init.service'

@Module({
	imports: [DataModule, UsersModule, AuthModule],
	providers: [InitService],
})
export class InitModule implements OnModuleInit {
	constructor(private readonly initService: InitService) {}

	async onModuleInit() {
		await this.initService.initData()
		await this.initService.InitAdmin()
	}
}
