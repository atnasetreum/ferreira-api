import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Seller } from './seller.entity';

@Entity('references')
export class Reference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  link: string;

  @Column('text', { nullable: true })
  image: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @ManyToOne(() => Seller, (user) => user.references)
  seller: Seller;
}
