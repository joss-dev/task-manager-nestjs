import { TaskOwnerGuard } from './task-owner.guard';

describe('TaskOwnerGuard', () => {
  it('should be defined', () => {
    expect(new TaskOwnerGuard()).toBeDefined();
  });
});
