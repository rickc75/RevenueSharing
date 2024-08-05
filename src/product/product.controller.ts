import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    const businessId = req.user.businessId;
    return this.productService.create(businessId, createProductDto);
  }


}
