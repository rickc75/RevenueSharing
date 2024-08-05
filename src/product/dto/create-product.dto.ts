import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
 
export class CreateProductDto {
  @IsString()
  @Length(1, 50)
  name: string;
  @IsString() 
  description: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsPositive()
  revenueSplit: number;
}
