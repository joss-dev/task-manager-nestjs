import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { TaskCreatedEvent } from '../events/task-created.event';
import { TaskUpdatedEvent } from '../events/task-updated.event';
import { NotificationContext } from '../../notifications/notification.context';

@Injectable()
export class TaskEventsListener {
  constructor(private readonly notificationContext: NotificationContext) {}

  @OnEvent('task.created')
  handleTaskCreated(event: TaskCreatedEvent) {
    this.notificationContext.notify('task.created', event.taskId, event.userId);
  }

  @OnEvent('task.updated')
  handleTaskUpdated(event: TaskUpdatedEvent) {
    this.notificationContext.notify('task.updated', event.taskId, event.userId);
  }
}
