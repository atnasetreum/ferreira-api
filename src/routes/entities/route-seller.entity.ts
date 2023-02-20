import { Seller } from 'src/sellers/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Route } from './route.entity';

@Entity('routes_sellers')
export class RouteSeller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Route, (route) => route.sellers, { onDelete: 'CASCADE' })
  route: Route;

  @ManyToOne(() => Seller, (seller) => seller.routeSeller)
  seller: Seller;
}
