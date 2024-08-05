import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PlaceOrderService } from './place-order.service';
import { CreatePlaceOrderDto } from './dto/create-place-order.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('place-order')
export class PlaceOrderController {
  constructor(private readonly placeOrderService: PlaceOrderService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  async create(
    @Req() req: Request,
    @Body() createPlaceOrderDto: CreatePlaceOrderDto,
  ) {
    const userid = await req.user.id;
    console.log(userid);
    return this.placeOrderService.create(userid, createPlaceOrderDto);
  }

  
}
