import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'
import { TokenDto } from './dto/token.dto'
import { User } from '../users/user.entity'
import { toAsync } from '../utils'
import { Constants } from '../constants'
import { Messages } from '../messages'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) { }

  async signIn(signInDto: SignInDto): Promise<TokenDto> {
    const user = await this.usersService.findOneByUsernameOrEmail(signInDto.username, signInDto.username)
    if (!user) throw new BadRequestException(Messages.USERNAME_PASSWORD_INCORRECT)

    const isMatch = await bcrypt.compare(signInDto.password, user.password)
    if (!isMatch) throw new BadRequestException(Messages.USERNAME_PASSWORD_INCORRECT)

    const { id: userId, firstName, lastName, username, email, phone } = user
    const payload = { userId, firstName, lastName, username, email, phone }

    return { accessToken: await this.jwtService.signAsync(payload, { secret: Constants.JWT_SECRET }) }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const found = await this.usersService.findOneByUsernameOrEmail(signUpDto.username, signUpDto.email)
    if (found) throw new ConflictException(Messages.USERNAME_EMAIL_EXISTS)

    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(signUpDto.password, salt)

    const user = new User()
    user.firstName = signUpDto.firstName
    user.lastName = signUpDto.lastName
    user.username = signUpDto.username
    user.email = signUpDto.email
    user.phone = signUpDto.phone
    user.salt = salt
    user.password = password

    const { err } = await toAsync<User, QueryFailedError>(this.usersService.save(user))
    if (err) throw new ConflictException(Messages.USERNAME_EMAIL_EXISTS)
  }
}
