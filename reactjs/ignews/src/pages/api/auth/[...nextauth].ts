import { query as q } from "faunadb";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.GitHub({
      //clientId armazenado no env.local
      clientId: process.env.GITHUB_CLIENT_ID,
      //clientSecret armazenado no env.local
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      //https://docs.github.com/pt/developers/apps/scopes-for-oauth-apps
      scope: "read:user",
    }),
  ],
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async session(session) {
      session.user.email

      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            //traz o resultado da interseção dos match
            q.Intersection([
              //% primeiro parâmetro da interseção (dado/usuário, que se possuir userId na collection subscriptions )
              q.Match(
                //faz o match entre o ref buscado nos matchs abaixo e o ref do data.userId no faunaDB
                q.Index('subscription_by_user_ref'),
                q.Select(
                  //busca o valor de ref do match abaixo
                  "ref",
                  q.Get(
                    q.Match(
                      //encontra o match entre o session email e o data.email no index user_by_email no faunadb
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              //% segundo parâmetro da interseção (dados/usuários, que estão como active na collection subscriptions)
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null,
        }
      }

    },
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        //fql - fauna query language
        //https://docs.fauna.com/fauna/current/api/fql/cheat_sheet
        await fauna.query(
          //todo if no fauna, obrigatóriamente tem de ter um else, que no caso é o get
          q.If(
            q.Not(
              q.Exists(
                //como se fosse um WHERE
                q.Match(
                  // faz a busca pelo index no faunaDB
                  // casefold normaliza o email em lowercase
                  q.Index("user_by_email"), q.Casefold(user.email)
                )
              )
            ),
              //https://docs.fauna.com/fauna/current/api/fql/functions/create?lang=javascript
              q.Create(q.Collection("users"), { data: { email } }),
            //como se fosse um SELECT e o ELSE do If
            q.Get(
              q.Match(
                q.Index("user_by_email"), q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
