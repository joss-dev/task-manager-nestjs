export interface NotificationStrategy {
  sendNotification(taskId: string, userId: string): Promise<void>;
}
