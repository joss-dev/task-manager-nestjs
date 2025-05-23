import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from './notification.strategy';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(EmailNotificationStrategy.name);

  sendNotification(taskId: string, userId: string): void {
    this.logger.log(
      `Email sent: New task (ID: ${taskId}) for user ${userId}`,
    );
  }
}
