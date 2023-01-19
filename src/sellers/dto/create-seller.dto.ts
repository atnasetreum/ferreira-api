import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly calle: string;

  @IsString()
  @IsNotEmpty()
  readonly numero: string;

  @IsString()
  @IsNotEmpty()
  readonly colonia: string;

  @IsString()
  @IsNotEmpty()
  readonly ciudad: string;

  @IsString()
  @IsNotEmpty()
  readonly municipio: string;

  @IsString()
  @IsNotEmpty()
  readonly estado: string;

  @IsPositive()
  @IsNotEmpty()
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
