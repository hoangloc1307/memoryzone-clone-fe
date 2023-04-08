import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        }

        const res = await fetch('http://localhost:3005/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const user = await res.json()
        if (!res.ok) {
          throw new Error(user.message)
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('token: ', token)
      console.log('user: ', user)
      console.log('account: ', account)
      if (account && user) {
        return {
          ...token,
          //@ts-ignore
          accessToken: user.data.access_token,
          //@ts-ignore
          refreshToken: user.data.access_token,
        }
      }

      return token
    },

    async session({ session, token }) {
      //@ts-ignore
      session.user.accessToken = token.accessToken
      //@ts-ignore
      session.user.refreshToken = token.refreshToken
      //@ts-ignore
      session.user.accessTokenExpires = token.accessTokenExpires

      return session
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: true,
})
