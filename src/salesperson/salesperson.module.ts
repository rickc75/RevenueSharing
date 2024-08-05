import { Module } from '@nestjs/common';
import { SalespersonService } from './salesperson.service';
import { SalespersonController } from './salesperson.controller';
import { DatabaseService } from 'src/database/database.module';

@Module({
  controllers: [SalespersonController],
  providers: [SalespersonService, DatabaseService],
})
export class SalespersonModule {}
