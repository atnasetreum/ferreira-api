import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLogisticDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
