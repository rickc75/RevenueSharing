import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceOrderDto } from './create-place-order.dto';

export class UpdatePlaceOrderDto extends PartialType(CreatePlaceOrderDto) {}
