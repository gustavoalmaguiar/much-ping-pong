import { auth } from "@/auth";

import {
  DEFAULT_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_SIGNIN_URL,
} from "@/utils/routes";

export default auth((req): Response | void | Promise<Response | void> => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return;
  }
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
    return;
  }
  if (!isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_SIGNIN_URL, nextUrl));
  }
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
