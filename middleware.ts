import NextAuth from "next-auth";

import authConfig from "./auth.config";

import {
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined;
  }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return undefined;
  // }

  // Redirect logged-in users trying to access "/" (login page) to the dashboard
  if (nextUrl.pathname === "/") {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined; // Allow access to "/" for non-logged-in users
  }

  // // Redirect logged-in users trying to access "/" to "/dashboard"
  // if (isLoggedIn && nextUrl.pathname === "/") {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL("/login", nextUrl));
  // }

  // return undefined;

  if (isAuthRoute && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl)); // Redirect non-logged-in users to login page if they try to access an auth route
  }

  if (isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // Redirect logged-in users trying to access non-auth routes
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl)); // Redirect non-logged-in users trying to access non-public routes
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
