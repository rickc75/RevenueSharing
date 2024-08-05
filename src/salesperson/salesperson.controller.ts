import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { SalespersonService } from './salesperson.service';
import { CreateSalespersonDto } from './dto/create-salesperson.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
@Controller('salesperson')
export class SalespersonController {
  constructor(private readonly salespersonService: SalespersonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() createSalespersonDto: CreateSalespersonDto,
  ) {
    const userId = req.user.id;
    console.log(userId);
    return this.salespersonService.create(userId, createSalespersonDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get() 
  findAll() {
    return this.salespersonService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() req: Request) {
    const id = req.user.id;
    return this.salespersonService.findOne(id);
  }
}
