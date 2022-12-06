import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { MongooseModule } from '@nestjs/mongoose';
import LocalSession from 'telegraf-session-local';
import { AppService } from './app.service';
import { PaymentModule } from './payments/payment.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';

const sessions = new LocalSession({ database: 'session_db.json' });
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        middlewares: [sessions.middleware()],
        token: config.get<string>('TG_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    PaymentModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
        dbName: 'payments',
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    GroupsModule,
  ],

  providers: [AppService],
})
export class AppModule {}
