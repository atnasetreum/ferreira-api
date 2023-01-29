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
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column('text', { nullable: true, default: '' })
  notes: string;

  @Column('numeric')
  ciclo: number;

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
