import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ReferencePhone } from './reference-phone.entity';
import { Reference } from './reference.entity';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uuid: string;

  @Column('text', { unique: true })
  nombre: string;

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
  linkUbicacion: string;

  @Column('text')
  image: string;

  @Column('text', { nullable: true })
  personaQueAtiende?: string;

  // @Column('numeric', { nullable: true, name: 'id_group' })
  // idGroup?: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @OneToMany(
    () => ReferencePhone,
    (referencePhones) => referencePhones.seller,
    { nullable: true },
  )
  referencePhones: ReferencePhone[];

  @OneToMany(() => Reference, (reference) => reference.seller, {
    nullable: true,
  })
  references: Reference[];

  @ManyToOne(() => Seller, (seller) => seller.sellers)
  parent: Seller;

  @OneToMany(() => Seller, (seller) => seller.parent)
  sellers: Seller[];
}
