import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from '../interfaces/task-repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  private readonly repository: Repository<Task>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Task);
  }

  async create(createDto: CreateTaskDto): Promise<Task> {
    const task = this.repository.create(createDto);
    return await this.repository.save(task);
  }

  async update(id: string, updateDto: UpdateTaskDto): Promise<Task> {
    await this.repository.update(id, updateDto);

    const task = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async findAll(userId?: string): Promise<Task[]> {
    if (userId) {
      return this.repository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    }
    return this.repository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Task | null> {
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByIdWithUser(id: string): Promise<Task | null> {
    return this.repository.findOne({ where: { id }, relations: ['user'] });
  }
}
