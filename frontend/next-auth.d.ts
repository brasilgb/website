import { JWT, Session, User } from "next-auth/next"

declare module "next-auth" {
  interface Session {
    accessToken: any
    user: {
      id: string
      accessToken: any
    } & Session["user"]
  }
  interface User {
    access_token: any
  }
  interface JWT {
    access_token: any
  }
}