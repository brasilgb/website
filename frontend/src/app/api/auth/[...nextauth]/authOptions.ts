import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
          method: "GET",
        })

        const setCookieHeader = res.headers.get("set-cookie")

        const cookies = setCookieHeader?.split(", ")
        // console.log(cookies)
        let sessionKey = null
        let xsrfToken = null

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1]
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1]
          }

          if (sessionKey && xsrfToken) {
            break
          }
        }
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        }
        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
        })

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken)
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
        try {
          // console.log(options)
          const response = await fetch("http://localhost:8000/api/login", options)

          if (response.ok) {
            const res = await response.json()
            return res
          } else {
            // console.log("HTTP error! Status:", response.status)
            // Handle non-successful response here, return an appropriate JSON response.
            return { error: "Authentication failed" }
          }
        } catch (error) {
          console.log("E-mail e/ou senha inválidos, tente novamente")
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user
        token.accessToken = user.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.access_token
      session.user = token.user
      return session
    },
  },
  pages: {
    signIn: "/login"
  }
}