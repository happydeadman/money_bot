import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './payment.entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  // constructor(
  //   @InjectRepository(PaymentEntity)
  //   private readonly paymentRepository: Repository<PaymentEntity>,
  // ) {}
  // async getAll() {
  //   return this.paymentRepository.find();
  // }
  // async addPayment(name: string) {
  //   const payment = await this.paymentRepository.create({ name });
  //   await this.paymentRepository.save(payment);
  //   return this.getAll;
  // }
}
