import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() SignupData: SignupDto) {
    return this.authService.signup(SignupData);
  }
  @Post('login')
  login(@Body() LoginData: LoginDto) {
    return this.authService.login(LoginData);
  }

}