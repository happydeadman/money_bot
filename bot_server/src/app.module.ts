import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { MongooseModule } from '@nestjs/mongoose';
import LocalSession from 'telegraf-session-local';
import { AppService } from './app.service';
import { PaymentModule } from './payments/payment.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '<TG_TOKEN>',
    }),
    PaymentModule,
    MongooseModule.forRoot(
      `mongodb+srv://happydeadman95:<PASSWORD>@cluster0.o2fjagm.mongodb.net?retryWrites=true&w=majority`,
      { dbName: 'payments', useNewUrlParser: true },
    ),
    UsersModule,
    AuthModule,
  ],

  providers: [AppService],
})
export class AppModule {}
