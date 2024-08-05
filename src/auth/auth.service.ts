import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { DatabaseService } from 'src/database/database.module';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './Constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtservice: JwtService
  ){}



  async signup(SignupData: SignupDto) {
    const user = await this.databaseService.user.findFirst({
      where:{
        email: SignupData.email,
      }
    })
    if (user) {
      throw new BadGatewayException('User with this email already exits')
    }
    if (SignupData.password !== SignupData.confirmPassword) {
      throw new BadGatewayException('password does not match')
    }
    SignupData.password = await bcrypt.hash(SignupData.password, 10);
    const res = await this.databaseService.user.create({
      data: {
        password: SignupData.password,
        email: SignupData.email,
        totalAmountSpent: 0,
      },
    });
    return res;
  }


  async login(loginData: LoginDto) {
    const user = await this.databaseService.user.findFirst({
      where:{
        email: loginData.email
      }
    })
    if (!user) {
      throw new NotFoundException('No user exits with the enterted email');
    }
    const validatePassword = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!validatePassword) {
      throw new NotFoundException('Wrong Password');
    }
    return {
      token: this.jwtservice.sign({
          email: loginData.email,
          password: loginData.password,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '10h',
        },
      ),
    }
  }
  

}
