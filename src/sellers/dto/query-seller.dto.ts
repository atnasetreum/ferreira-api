import { IsOptional, IsString } from 'class-validator';

export class QuerySellerDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly uuid: string;

  @IsString()
  @IsOptional()
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly personaQueAtiende: string;

  @IsString()
  @IsOptional()
  readonly estado: string;

  @IsString()
  @IsOptional()
  readonly municipio: string;

  @IsString()
  @IsOptional()
  readonly ciudad: string;

  @IsString()
  @IsOptional()
  readonly referencia: string;

  @IsString()
  @IsOptional()
  readonly telefono: string;

  @IsString()
  @IsOptional()
  readonly telefonoNombre: string;
}
