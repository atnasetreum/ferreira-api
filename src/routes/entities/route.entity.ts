import { Seller } from 'src/sellers/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('routes')
@Unique(['date', 'user'])
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column('text', { nullable: true, default: '' })
  notes: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Seller, { eager: true })
  @JoinTable({ name: 'routes_sellers' })
  sellers: Seller[];
}
