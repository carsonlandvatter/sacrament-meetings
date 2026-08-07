import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const CredentialsSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: { signIn: '/login' },
    providers: [
        Credentials({
            credentials: { username: {}, password: {} },
            async authorize(credentials) {
                const parsed = CredentialsSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { username, password } = parsed.data;
                if (
                    username === process.env.BISHOPRIC_USERNAME &&
                    password === process.env.BISHOPRIC_PASSWORD
                ) {
                    return { id: '1', name: username };
                }

                return null;
            }
        })
    ]
})