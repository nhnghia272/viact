import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Join' })
  firstName: string

  @IsNotEmpty()
  @ApiProperty({ example: 'Wick' })
  lastName: string

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'viact' })
  username: string

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  password: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'viact@gmail.com' })
  email: string

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '+84973123456' })
  phone: string
}
