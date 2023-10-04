/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
