import type { UserSession } from '../../domain/entities/User';
import type { UserSessionRepository } from '../../domain/repositories/UserSessionRepository';

// Keeps authentication/session access outside the UI layer.
export interface GetCurrentUserSessionUseCase {
  execute(): Promise<UserSession>;
}

// The implementation can later be backed by secure storage or a real auth API.
export class DefaultGetCurrentUserSessionUseCase implements GetCurrentUserSessionUseCase {
  constructor(private readonly userSessionRepository: UserSessionRepository) {}

  async execute(): Promise<UserSession> {
    return this.userSessionRepository.getCurrentSession();
  }
}
