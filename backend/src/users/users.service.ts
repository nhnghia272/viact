import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findOneByUsernameOrEmail(username: string, email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: [{ username }, { email }] })
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
}
