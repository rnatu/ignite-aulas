import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      //clientId armazenado no env.local
      clientId: process.env.GITHUB_CLIENT_ID,
      //clientSecret armazenado no env.local
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      //https://docs.github.com/pt/developers/apps/scopes-for-oauth-apps
      scope: 'read:user'
    }),
  ],
})
