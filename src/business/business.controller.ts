import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createBusinessDto: CreateBusinessDto,
  ) {
    console.log(req.user);
    const userId = req.user.id;
    console.log(userId);
    const hasBusiness = await this.businessService.hasBusiness(userId);
    if (hasBusiness) {
      throw new BadRequestException('You already have a registered business.');
    }
    return this.businessService.create(userId, createBusinessDto);

  }

}
