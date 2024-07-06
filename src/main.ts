import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getLoggingUtil } from './utils/logging.util';
import { GlobalExceptionsFilter } from './exception-filter/exception.filter';
const logger = getLoggingUtil('MAIN');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/apis/book-review-sys');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionsFilter());
  const PORT: number = 3000;
  logger.info('BOOTSTRAP', `BOOK_REVIEW_SYS_API_STARTED - PORT: ${PORT}`);
  await app.listen(3000);
}
bootstrap();
