import { query } from './db'; // Import your query function

interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  password_hash?: string;
  accessible_db?: string;
  created_at?: Date;
  updated_at?: Date;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return result.rows[0] as User;
    }
    return null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
  try {
    const result = await query('INSERT INTO users (username, email, phone_number, password_hash, accessible_db) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      user.username,
      user.email,
      user.phone_number,
      user.password_hash,
      user.accessible_db,
    ]);
    if (result.rows.length > 0) {
      return result.rows[0] as User;
    }
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}
