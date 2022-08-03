import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService } from './payment.service';
import { Payment } from './schemas/payment.schema';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get()
  async getAll(): Promise<Payment[]> {
    return this.paymentService.getAll();
  }
  @Get(':id')
  async getById(id: string): Promise<Payment> {
    return this.paymentService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.addPayment(createPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Param('id') id: string,
  ): Promise<Payment> {
    return this.paymentService.update(id, updatePaymentDto);
  }
}
