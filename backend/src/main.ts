import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { EnvVariables, EnvApp } from './configs/env.config'
import { setupGlobalValidationPipe } from './configs/validation.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: { optionsSuccessStatus: 200 } })

	setupGlobalValidationPipe(app)

	const { port } = app.get(ConfigService<EnvVariables>).get<EnvApp>('app')
	await app.listen(port, () => {
		console.log(`[APP] Started on PORT ${port}`)
	})
}
bootstrap()
