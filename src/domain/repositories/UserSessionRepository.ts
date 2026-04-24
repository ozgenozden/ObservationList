import type { UserSession } from '../entities/User';

// Auth can move to an API later while the app keeps depending on this contract.
export interface UserSessionRepository {
  getCurrentSession(): Promise<UserSession>;
}
