import { Body, Controller, Post, Get, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'
import { TokenDto } from './dto/token.dto'
import { ProfileDto } from './dto/profile.dto'

@ApiTags('Viact Api')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: TokenDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Username or password is incorrect' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'The email or username exists' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: ProfileDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return req.user
  }
}
