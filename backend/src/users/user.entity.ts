import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string
}