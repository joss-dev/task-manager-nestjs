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

  async update(id: number, updateDto: UpdateTaskDto): Promise<Task> {
    await this.repository.update(id, updateDto);
    return this.repository.findOneByOrFail({ id });
  }

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
