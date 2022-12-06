import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './payment.entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // @Inject(ConfigService)
  // public config: ConfigService;
  // public getHello(): string {
  //   const databaseName: string = this.config.get('MONGO_URL');
  //   console.log({ databaseName });
  //   return 'Hello World!';
  // }
}
