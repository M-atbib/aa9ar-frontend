import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

// Define paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/project",
  "/templates",
  "/profile",
  "/onboarding",
  "/add-project",
];

// Define paths that are only accessible when not authenticated
const authPaths = ["/", "/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get both tokens from cookies
  const accessToken = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Consider authenticated only if both tokens exist
  const isAuthenticated = !!accessToken && !!refreshToken;

  // If trying to access auth pages while authenticated, redirect to dashboard
  if (isAuthenticated && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If trying to access protected routes while not authenticated, redirect to login
  if (
    !isAuthenticated &&
    protectedPaths.some((path) => pathname.startsWith(path))
  ) {
    // Clear any remaining cookies just in case
    const response = NextResponse.redirect(new URL("/login", request.url));
    console.log('token',Cookies.get("token"));
    
    response.cookies.delete("token");
    response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - logo (public logos)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|logo).*)",
  ],
};
