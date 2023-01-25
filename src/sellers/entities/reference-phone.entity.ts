import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Seller } from './seller.entity';

@Entity('reference-phones')
export class ReferencePhone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  phone: string;

  @Column('numeric')
  order: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @ManyToOne(() => Seller, (user) => user.referencePhones, {
    onDelete: 'CASCADE',
  })
  seller: Seller;
}
