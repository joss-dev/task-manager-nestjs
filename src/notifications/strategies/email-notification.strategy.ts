import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from './notification.strategy';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  private readonly logger = new Logger(EmailNotificationStrategy.name);

  async sendNotification(taskId: string, userId: string): Promise<void> {
    this.logger.log(
      `Email enviado: Nueva tarea (ID: ${taskId}) para usuario ${userId}`,
    );
  }
}
