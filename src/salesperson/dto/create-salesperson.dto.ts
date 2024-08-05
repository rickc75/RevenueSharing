import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSalespersonDto {
  @IsNotEmpty()
  @IsString()
  paymailId: string;
}
