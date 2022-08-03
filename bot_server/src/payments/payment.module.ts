import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentUpdate } from './payment.update';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  providers: [PaymentService, PaymentUpdate],
  controllers: [PaymentController],
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
})
export class PaymentModule {}
