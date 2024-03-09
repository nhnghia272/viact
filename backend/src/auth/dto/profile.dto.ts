import { ApiProperty } from '@nestjs/swagger'

export class ProfileDto {
  @ApiProperty({ example: 1 })
  userId: number

  @ApiProperty({ example: 'Join' })
  firstName: string

  @ApiProperty({ example: 'Wick' })
  lastName: string

  @ApiProperty({ example: 'viact' })
  username: string

  @ApiProperty({ example: 'viact@gmail.com' })
  email: string

  @ApiProperty({ example: '+84973123456' })
  phone: string
}
