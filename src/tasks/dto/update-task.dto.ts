/* eslint-disable prettier/prettier */

import { TaskStatus } from '../entities/task.entity';
import { IsString, IsOptional, MinLength, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @MinLength(3)
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.PENDING, TaskStatus.iN_PROGRESS])
  status?: TaskStatus;
}
