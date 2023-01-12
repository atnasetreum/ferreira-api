import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum EUserType {
  ADMIN = 'ADMIN',
  USER = 'DRIVER',
}

@Entity('userTypes')
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'enum',
    enum: EUserType,
  })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
