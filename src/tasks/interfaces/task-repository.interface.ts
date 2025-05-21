import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface ITaskRepository {
  create(dto: CreateTaskDto): Promise<Task>;
  update(id: number, dto: UpdateTaskDto): Promise<Task>;
  findAll(): Promise<Task[]>;
  findOne(id: number): Promise<Task | null>;
  delete(id: number): Promise<void>;
}
