import { Module } from '@nestjs/common';
import { PlaceOrderService } from './place-order.service';
import { PlaceOrderController } from './place-order.controller';
import { DatabaseService } from 'src/database/database.service';
import { PaymentsService } from 'src/payments/payments.service';

@Module({
  controllers: [PlaceOrderController],
  providers: [PlaceOrderService, PaymentsService, DatabaseService],
})
export class PlaceOrderModule {}
