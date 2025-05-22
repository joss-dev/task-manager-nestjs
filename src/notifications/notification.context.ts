import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from './strategies/notification.strategy';
import { EmailNotificationStrategy } from './strategies/email-notification.strategy';
import { InternalMessageNotificationStrategy } from './strategies/internal-message-notification.strategy';

@Injectable()
export class NotificationContext {
  constructor(
    private readonly emailStrategy: EmailNotificationStrategy,
    private readonly internalMessageStrategy: InternalMessageNotificationStrategy,
  ) {}

  async notify(
    eventType: 'task.created' | 'task.updated',
    taskId: string,
    userId: string,
  ) {
    let strategy: NotificationStrategy;

    switch (eventType) {
      case 'task.created':
        strategy = this.emailStrategy;
        break;
      case 'task.updated':
        strategy = this.internalMessageStrategy;
        break;
      default:
        throw new Error(`Estrategia desconocida para el evento: ${eventType}`);
    }

    await strategy.sendNotification(taskId, userId);
  }
}
