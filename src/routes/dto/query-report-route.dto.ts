import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class QueryReportRouteDto {
  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;

  @IsPositive()
  @IsNotEmpty()
  readonly logisticaId: number;
}
