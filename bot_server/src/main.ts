import { NestFactory } from '@nestjs/core';
import expressSession from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      // origin: 'https://2453-188-226-109-63.eu.ngrok.io',
      credentials: true,
    },
  });
  app.use(
    expressSession({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
