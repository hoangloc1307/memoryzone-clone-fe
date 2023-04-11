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
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider !== 'credentials') {
        try {
          const res = await axios.post(
            'http://localhost:3005/api/v1/auth/get-access-token',
            { ...user, ...account },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          user.accessToken = res.data.data.access_token
          user.refreshToken = res.data.data.refresh_token
          return true
        } catch (err: any) {
          throw new Error(err.response.data.message)
        }
      }
      return true
    },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
}

export default NextAuth(authOptions)
