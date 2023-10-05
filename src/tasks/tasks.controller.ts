import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    console.log('id recibido', id);
    return this.tasksService.findOne(id);
  }

  @Post()
  postTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Put(':id')
  putTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    console.log(id, updateTaskDto);
    return this.tasksService.update(id, updateTaskDto);
  }
}
