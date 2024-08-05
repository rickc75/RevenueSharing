import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { DatabaseModule, DatabaseService } from 'src/database/database.module';

@Module({
  imports: [],
  controllers: [BusinessController],
  providers: [BusinessService, DatabaseModule, DatabaseService],
})
export class BusinessModule {}
