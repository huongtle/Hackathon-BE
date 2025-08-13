import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeverityModule } from './severity/severity.module';
import { SymptomModule } from './symptom/symptom.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AIService } from './ai/ai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    SeverityModule,
    SymptomModule,
  ],
  controllers: [AppController],
  providers: [AppService, AIService],
})

export class AppModule {}