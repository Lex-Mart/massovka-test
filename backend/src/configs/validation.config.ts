import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common'

const globalValidationPipe = new ValidationPipe({
	transform: true,
	transformOptions: {
		strategy: 'exposeAll',
	},
	stopAtFirstError: false,
	forbidUnknownValues: true,
	disableErrorMessages: false,
	exceptionFactory: (errors) => new BadRequestException(errors),
	validationError: { target: false, value: false },
})

export const setupGlobalValidationPipe = (app: INestApplication): void => {
	app.useGlobalPipes(globalValidationPipe)
}
