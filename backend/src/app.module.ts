import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MYSQL_URL } from './constants'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { User } from './users/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: MYSQL_URL,
      synchronize: true,
      entities: [User]
    }),
    AuthModule, UsersModule,
  ]
})
export class AppModule { }
