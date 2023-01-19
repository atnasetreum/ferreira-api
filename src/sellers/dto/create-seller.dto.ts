import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly calle: string;

  @IsString()
  @IsOptional()
  readonly numero: string;

  @IsString()
  @IsOptional()
  readonly colonia: string;

  @IsString()
  @IsOptional()
  readonly ciudad: string;

  @IsString()
  @IsOptional()
  readonly municipio: string;

  @IsString()
  @IsOptional()
  readonly estado: string;

  @IsPositive()
  @IsOptional()
  readonly cp: number;

  @IsString()
  @IsNotEmpty()
  readonly linkUbicacion: string;

  @IsString()
  @IsOptional()
  readonly personaQueAtiende: string;

  @IsString()
  @IsOptional()
  readonly telefonos: string;

  @IsString()
  @IsOptional()
  readonly referencias: string;

  @IsPositive()
  @IsOptional()
  readonly idGroup: number;
}
