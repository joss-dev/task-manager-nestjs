import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from './strategies/notification.strategy';
import { EmailNotificationStrategy } from './strategies/email-notification.strategy';
import { InternalMessageNotificationStrategy } from './strategies/internal-message-notification.strategy';

type EventType = 'task.created' | 'task.updated';

@Injectable()
export class NotificationContext {
  private readonly strategies: Map<EventType, NotificationStrategy>;

  constructor(
    private readonly emailStrategy: EmailNotificationStrategy,
    private readonly internalMessageStrategy: InternalMessageNotificationStrategy,
  ) {
    this.strategies = new Map<EventType, NotificationStrategy>([
      ['task.created', this.emailStrategy],
      ['task.updated', this.internalMessageStrategy],
    ]);
  }

  notify(eventType: EventType, taskId: string, userId: string): void {
    const strategy = this.strategies.get(eventType);
    if (!strategy) {
      throw new Error(`Estrategia desconocida para el evento: ${eventType}`);
    }

    strategy.sendNotification(taskId, userId);
  }
}
