export class TaskUpdatedEvent {
  constructor(
    public readonly taskId: string,
    public readonly userId: string,
  ) {}
}
