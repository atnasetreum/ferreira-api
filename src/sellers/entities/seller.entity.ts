import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uuid: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  calle: string;

  @Column('text')
  numero: string;

  @Column('text')
  colonia: string;

  @Column('text')
  ciudad: string;

  @Column('text')
  municipio: string;

  @Column('text')
  estado: string;

  @Column('numeric')
  cp: number;

  @Column('text')
  link: string;

  @Column('text')
  image: string;

  @Column('text')
  personaQueAtiende: string;

  @Column('numeric', { nullable: true })
  idGroup?: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;
}
