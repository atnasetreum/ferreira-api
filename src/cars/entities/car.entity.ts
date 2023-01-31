import { Logistic } from 'src/logistics/entities/logistic.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity('cars')
@Unique(['placa', 'logistica'])
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  placa: string;

  @Column('text')
  image: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @ManyToOne(() => Logistic, (logistic) => logistic.cars)
  logistica: Logistic;
}
