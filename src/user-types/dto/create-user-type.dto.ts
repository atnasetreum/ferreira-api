import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
