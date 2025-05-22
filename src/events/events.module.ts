import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskEventsListener } from './listeners/task-events.listener';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [EventEmitterModule.forRoot(), NotificationsModule],
  providers: [TaskEventsListener],
  exports: [TaskEventsListener],
})
export class EventsModule {}
