import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from './notification.strategy';

@Injectable()
export class InternalMessageNotificationStrategy
  implements NotificationStrategy
{
  private readonly logger = new Logger(
    InternalMessageNotificationStrategy.name,
  );

  sendNotification(taskId: string, userId: string): void {
    this.logger.log(
      `Internal message: Task updated (ID: ${taskId}) by user ${userId}`,
    );
  }
}
