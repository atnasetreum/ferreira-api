import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  readonly placa: string;

  @IsPositive()
  @IsNotEmpty()
  readonly logisticaId: number;
}
