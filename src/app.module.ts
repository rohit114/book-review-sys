import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './service/AuthGuard';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TestResolver } from './resolvers/test-resolver';
import { PrismaService } from './service/prisma.service';
import { AuthController } from './controller/AuthController';
import { AuthService } from './service/auth.service';
import { BookController } from './controller/BookController';
import { BookService } from './service/book.service';
import { ReviewController } from './controller/ReviewController';
import { ReviewService } from './service/review.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true, //turn on/off
    }),
  ],
  controllers: [AppController, AuthController, BookController, ReviewController],
  providers: [AppService, AuthGuard, TestResolver, PrismaService, AuthService, BookService, ReviewService],
})
export class AppModule { }
