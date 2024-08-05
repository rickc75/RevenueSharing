import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { ProductModule } from './product/product.module';
import { SalespersonModule } from './salesperson/salesperson.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PlaceOrderModule } from './place-order/place-order.module';
@Module({
  imports: [
    UsersModule,
    BusinessModule,
    ProductModule,
    SalespersonModule,
    PaymentsModule,
    AuthModule,
    DatabaseModule,
    PlaceOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
