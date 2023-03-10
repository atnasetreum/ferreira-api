import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inegi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  entidad: string;

  @Column('text')
  municipio: string;

  @Column('text')
  localidad: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;
}
