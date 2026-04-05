import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Custom logic if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all admin routes except of the login page
     */
    "/admin/blog/:path*",
    "/admin/dashboard/:path*",
    "/admin/settings/:path*",
    // Explicitly protect the base admin route if it exists
    "/admin", 
  ],
};
