import { RouteSeller } from 'src/routes/entities';
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

  @Column('text', { nullable: true })
  calle: string;

  @Column('text', { nullable: true })
  numero: string;

  @Column('text', { nullable: true })
  colonia: string;

  @Column('text', { nullable: true })
  ciudad: string;

  @Column('text', { nullable: true })
  municipio: string;

  @Column('text', { nullable: true })
  estado: string;

  @Column('numeric', { nullable: true })
  cp: number;

  @Column('text')
  linkUbicacion: string;

  @Column('text')
  image: string;

  @Column('text', { nullable: true })
  personaQueAtiende?: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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

  @OneToMany(() => RouteSeller, (routeSeller) => routeSeller.seller)
  routeSeller: RouteSeller[];
}
