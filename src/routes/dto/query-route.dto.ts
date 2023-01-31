import { IsDate, IsOptional, IsPositive } from 'class-validator';

export class QueryRouteDto {
  @IsPositive()
  @IsOptional()
  readonly id: number;

  @IsDate()
  @IsOptional()
  readonly date: Date;

  @IsPositive()
  @IsOptional()
  readonly driverId: number;

  @IsPositive()
  @IsOptional()
  readonly carId: number;

  @IsPositive()
  @IsOptional()
  readonly logisticaId: number;
}
