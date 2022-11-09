import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import connectDatabase from '../../../lib/db';

import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
    providers: [
        CredentialsProvider({
            session: {
                jwt: true // JSON Web Tokens are used
            },

            async authorize(credentials) {
                const client = await connectDatabase();
                const db = client.db();

                const usersCollection = db.collection('users');
                const foundUser = await usersCollection.findOne({ email: credentials.email });

                if (!foundUser) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isPasswordValid = await verifyPassword(credentials.password, foundUser.password);

                if (!isPasswordValid) {
                    client.close();
                    throw new Error('Wrong password!');
                }

                client.close();

                return { email: foundUser.email };
            }
        })
    ]
});