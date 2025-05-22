import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface ITaskRepository {
  create(dto: CreateTaskDto): Promise<Task>;
  update(id: string, dto: UpdateTaskDto): Promise<Task>;
  findAll(): Promise<Task[]>;
  findOne(id: string): Promise<Task | null>;
  delete(id: string): Promise<void>;
  findByIdWithUser(id: string): Promise<Task | null>;
}
