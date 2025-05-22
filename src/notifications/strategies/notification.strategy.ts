export interface NotificationStrategy {
  sendNotification(taskId: string, userId: string): void;
}
