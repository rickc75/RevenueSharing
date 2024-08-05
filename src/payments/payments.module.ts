import { Module } from '@nestjs/common';
//import { PaymentsController } from './payments.controller';
import { DatabaseService } from 'src/database/database.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentsService } from './payments.service';
  
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PaymentsService, DatabaseService],
})
export class PaymentsModule {}
