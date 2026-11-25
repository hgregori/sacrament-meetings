import { neon } from '@neondatabase/serverless';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

// Fallback seed user for testing or local development
const fallbackUsers: User[] = [
  {
    id: '1',
    name: 'Bispo Tony',
    email: 'bispo@igreja.com',
    // Hash for '123456'
    passwordHash: '$2b$10$6QmqS.LVu39q.IUcJEFIWuZhlScjseAW1Yax3xj6BXVVEXRVEtg/q',
  },
  {
    id: '2',
    name: 'Líder Ala',
    email: 'user@nextmail.com',
    passwordHash: '$2b$10$6QmqS.LVu39q.IUcJEFIWuZhlScjseAW1Yax3xj6BXVVEXRVEtg/q',
  },
];

export async function getUserByEmail(email: string): Promise<User | null> {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    try {
      const sql = neon(databaseUrl);

      // Try fetching from users table if it exists in Neon
      const rows = await sql`
        SELECT id, name, email, password as "passwordHash"
        FROM users
        WHERE email = ${email}
        LIMIT 1
      `;

      if (rows.length > 0) {
        return rows[0] as User;
      }
    } catch {
      // If table doesn't exist yet in PostgreSQL, gracefully fall back
    }
  }

  // Fallback to configured user list
  const user = fallbackUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return user ?? null;
}
