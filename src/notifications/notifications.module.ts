import { Module } from '@nestjs/common';
import { EmailNotificationStrategy } from './strategies/email-notification.strategy';
import { InternalMessageNotificationStrategy } from './strategies/internal-message-notification.strategy';
import { NotificationContext } from './notification.context';

@Module({
  providers: [
    EmailNotificationStrategy,
    InternalMessageNotificationStrategy,
    NotificationContext,
  ],
  exports: [
    NotificationContext,
    EmailNotificationStrategy,
    InternalMessageNotificationStrategy,
  ],
})
export class NotificationsModule {}
