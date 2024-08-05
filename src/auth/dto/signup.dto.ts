import { IsEmail, IsString, Length } from 'class-validator';
export class SignupDto{
  
  @IsString()
  @Length(6, 20)
  password: string;
  
  @IsString()
  @Length(6, 20)
  confirmPassword: string;
  
  @IsEmail()
  email: string;

  
}