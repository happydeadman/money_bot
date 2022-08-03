import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async getAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  async getById(id: string): Promise<Payment> {
    return this.paymentModel.findById(id);
  }

  async addPayment(paymentDto: CreatePaymentDto): Promise<Payment> {
    const newPayment = new this.paymentModel(paymentDto);
    return newPayment.save();
  }
  async remove(id: string): Promise<Payment> {
    return this.paymentModel.findByIdAndRemove(id);
  }
  async update(id: string, paymentDto: UpdatePaymentDto): Promise<Payment> {
    return this.paymentModel.findByIdAndUpdate(id, paymentDto, { new: true });
  }
}
