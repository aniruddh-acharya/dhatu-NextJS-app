import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null | undefined;
      token?: JWT;
      email?: string | null | undefined;
    };
  }
}