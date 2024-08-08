import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "./app/lib/definitions";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"

async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }


export const { auth,signIn,signOut } = NextAuth({
...authConfig,
providers:[Credentials({
    type:"credentials",
    async authorize(credentials){
        const { data,success } = z
        .object({ email: z.string().email(), password: z.string().min(6)})
        .safeParse(credentials)
        
        if(!success){
            return null;
        }

        const { email, password } = data;

        const user = await getUser(email);
        
        if(!user){
            return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            return null;
        }

        return user;
    }
})]
})