import { Car } from 'src/cars/entities/car.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RouteSeller } from './route-seller.entity';

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

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  pago: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Car)
  @JoinColumn()
  car: Car;

  @OneToMany(() => RouteSeller, (routeSeller) => routeSeller.route, {
    eager: true,
  })
  sellers: RouteSeller[];
}
