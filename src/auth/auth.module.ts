import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { DatabaseModule, DatabaseService } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}