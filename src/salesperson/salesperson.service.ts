import { Injectable } from '@nestjs/common';
import { CreateSalespersonDto } from './dto/create-salesperson.dto';
import { DatabaseService } from 'src/database/database.module';

@Injectable()
export class SalespersonService {
  constructor(readonly databaseService: DatabaseService) {}
  async create(userid: number, createSalespersonDto: CreateSalespersonDto) {
    console.log(userid);
    const finduser = await this.databaseService.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (finduser.role == 'USER') {
      await this.databaseService.user.update({
        where: { id: userid },
        data: { role: 'SALESPERSON' },
      });
    } else if (finduser.role == 'BUSINESS_OWNER') {
      await this.databaseService.user.update({
        where: {
          id: userid,
        },
        data: {
          role: 'BUSINESS_OWNER_AND_SALESPERSON',
        },
      });
    }
    return await this.databaseService.seller.create({
      data:{
        paymailId: createSalespersonDto.paymailId,
        sellerUserId: userid,
        totalAmountEarned: 0,
        totalSalesMade: 0,
        rank: (await this.databaseService.seller.count()) + 1,
      }
    });
  }


  async findAll(){
    return this.databaseService.seller.findMany({
      orderBy:{
        rank: 'asc',
      }
    })
  }
  async findOne(id: number) {
    return this.databaseService.seller.findFirst({
      where:{
        id: id,
      }
    })
  }
  
}
