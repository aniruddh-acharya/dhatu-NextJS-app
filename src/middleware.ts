// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    },
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/upload","/"] }