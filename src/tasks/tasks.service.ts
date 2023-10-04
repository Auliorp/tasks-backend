import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
  ];

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);

    return task;
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, taskUpdateDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const newTask = Object.assign(task, taskUpdateDto);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }
}
