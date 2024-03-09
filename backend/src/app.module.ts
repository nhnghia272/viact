import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Constants } from './constants'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { User } from './users/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: Constants.MYSQL_URL,
      synchronize: true,
      entities: [User]
    }),
    AuthModule, UsersModule,
  ]
})
export class AppModule { }
