import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { Config } from '../config'

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: Config.JWT_SECRET,
    signOptions: { expiresIn: `${Config.JWT_EXPIRES}s` },
  }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
