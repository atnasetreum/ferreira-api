import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateRouteDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsPositive()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly sellers: number[];

  @IsString()
  @IsOptional()
  readonly notes: string;
}
