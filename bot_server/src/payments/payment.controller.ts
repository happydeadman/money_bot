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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService } from './payment.service';
import { Payment } from './schemas/payment.schema';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Payment[]> {
    return this.paymentService.getAll();
  }
  @Get(':id')
  async getById(id: string): Promise<Payment> {
    return this.paymentService.getById(id);
  }
  @Get('groupPayments/:groupId')
  async getUserGroups(@Param('groupId') groupId: string): Promise<Payment[]> {
    return this.paymentService.getByGroupId(groupId);
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
