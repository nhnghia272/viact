import { IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'viact' })
  username: string

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  password: string
}
