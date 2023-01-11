import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

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
  readonly link: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly personaQueAtiende: string;
}
