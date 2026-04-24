import type { UserSession } from '../../domain/entities/User';
import type { UserSessionRepository } from '../../domain/repositories/UserSessionRepository';

const DEMO_MANAGER_SESSION: UserSession = {
  user: {
    id: 'manager-1',
    displayName: 'Housekeeping Manager',
    role: 'manager',
    username: 'manager',
  },
  signedInAt: new Date('2026-04-24T07:00:00.000Z'),
};

export class InMemoryUserSessionRepository implements UserSessionRepository {
  // Demo session keeps the app testable until real authentication is connected.
  async getCurrentSession(): Promise<UserSession> {
    return DEMO_MANAGER_SESSION;
  }
}
