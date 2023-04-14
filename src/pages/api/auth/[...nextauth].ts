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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return axios
          .post(`${process.env.backEndUrl}/auth/login`, credentials, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then((res) => {
            const { id, email, role, accessToken, refreshToken } = res.data.data
            return { id, email, role, accessToken, refreshToken }
          })
          .catch((err) => {
            throw new Error(err.response.data.message)
          })
      },
    }),
  ],
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider !== 'credentials') {
        try {
          const res = await axios.post(
            `${process.env.backEndUrl}/auth/get-access-token`,
            { ...user, ...account },
            { headers: { 'Content-Type': 'application/json' } }
          )

          user.accessToken = res.data.data.accessToken
          user.refreshToken = res.data.data.refreshToken
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
