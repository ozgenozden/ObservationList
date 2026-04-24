export type UserRole = 'manager' | 'housekeeper';

// Authenticated app user; real authentication can later replace the in-memory source.
export interface User {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
}

// Current signed-in user context used by role-based application rules.
export interface UserSession {
  user: User;
  signedInAt: Date;
}
