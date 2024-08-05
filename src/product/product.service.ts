import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseServices: DatabaseService) {}

  async create(businessId: number, createProductDto: CreateProductDto) {
    const user = await this.databaseServices.user.findFirst({
      where:{
        businessId: businessId,
      }
    })
    return this.databaseServices.product.create({
      data:{
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        revenueSplit: createProductDto.revenueSplit,
        businessId: user.businessId,
        userId: user.id
      }
    });
  }
}
