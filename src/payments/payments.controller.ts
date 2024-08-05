import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PaymentsService } from './payments.service';
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return 'no using this payment services is directly called from place-order-service ';
  } 
}
