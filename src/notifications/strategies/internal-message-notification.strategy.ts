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
      `Mensaje interno: Tarea actualizada (ID: ${taskId}) por el usuario ${userId}`,
    );
  }
}
