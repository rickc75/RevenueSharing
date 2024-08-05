import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';


@Module({
  controllers: [],
  imports: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
export { DatabaseService };

