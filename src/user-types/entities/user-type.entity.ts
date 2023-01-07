import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EUserType {
  ADMIN = 'ADMIN',
  USER = 'DRIVER',
}

@Entity()
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
}
