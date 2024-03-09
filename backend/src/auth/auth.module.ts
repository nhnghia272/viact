import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { Constants } from '../constants'

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: Constants.JWT_SECRET,
    signOptions: { expiresIn: `${Constants.JWT_EXPIRES}s` },
  }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
