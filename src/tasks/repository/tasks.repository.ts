import { Injectable } from '@nestjs/common';
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
    return this.repository.findOneByOrFail({ id });
  }

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
