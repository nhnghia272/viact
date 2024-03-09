import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JWT_SECRET, JWT_EXPIRES } from '../constants'

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: `${JWT_EXPIRES}s` },
  }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
