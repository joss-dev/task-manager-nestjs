import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository, IsNull } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { TaskFactory } from './factory/task.factory';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from 'src/events/events/task-created.event';
import { TaskUpdatedEvent } from 'src/events/events/task-updated.event';
import { Inject } from '@nestjs/common';
import { TASK_REPOSITORY } from './constants/task-repository.token';
import { ITaskRepository } from './interfaces/task-repository.interface';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly taskFactory: TaskFactory,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { id: userId, deletedAt: IsNull() },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const task = this.taskFactory.create(createTaskDto, user);

    const savedTask = await this.taskRepository.create(task);

    this.eventEmitter.emit(
      'task.created',
      new TaskCreatedEvent(savedTask.id, userId),
    );

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findByIdWithUser(id: string) {
    return this.taskRepository.findByIdWithUser(id);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);

    this.eventEmitter.emit(
      'task.updated',
      new TaskUpdatedEvent(id, task.user.id),
    );

    return this.taskRepository.update(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.delete(task);
  }
}
