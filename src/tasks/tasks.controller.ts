import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    const allTasks = await this.tasksService.findAll();
    if (allTasks.length === 0)
      throw new NotFoundException('No hay tareas en la Db');
    return allTasks;
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException('Tarea no encontrada');
    return task;
  }

  @Post()
  async postTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('La tarea ya existe');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);
    if (!task) throw new NotFoundException('Tarea no encontrada');
    return task;
  }

  @Put(':id')
  async putTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.update(id, updateTaskDto);
    if (!task) throw new NotFoundException('tarea no encontrada');
    return task;
  }
}
