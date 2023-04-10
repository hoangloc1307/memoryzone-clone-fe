import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        return axios
          .post('http://localhost:3005/api/v1/auth/login', credentials, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            const { id, email, role, access_token, refresh_token } = res.data.data
            return {
              id,
              email,
              role,
              accessToken: access_token,
              refreshToken: refresh_token,
            }
          })
          .catch((err) => {
            throw new Error(err.response.data.message)
          })
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider !== 'credentials') {
        const token = await new Promise<{ access_token: string; refresh_token: string }>((resolve, reject) => {
          setTimeout(() => {
            resolve({ access_token: 'testjfdsflsdjfklsdjflsdjf', refresh_token: 'testrefreshjfdsflsdjfklsdjflsdjf' })
          }, 1000)
        })

        user.accessToken = token.access_token
        user.refreshToken = token.refresh_token
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
}

export default NextAuth(authOptions)
