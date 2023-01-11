import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import * as argon2 from 'argon2';
import { UserType } from 'src/user-types/entities/user-type.entity';

@Entity('users')
@Index(['name', 'userType'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @OneToOne(() => UserType)
  @JoinColumn()
  userType: UserType;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
