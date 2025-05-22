import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from './notification.strategy';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(EmailNotificationStrategy.name);

  sendNotification(taskId: string, userId: string): void {
    this.logger.log(
      `Email enviado: Nueva tarea (ID: ${taskId}) para usuario ${userId}`,
    );
  }
}
