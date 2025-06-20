import { auth } from "@/auth";
import {
  apiPrefix,
  authenticationRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";
import { isTokenValid } from "./utils/functions/is-token-valid";
import { NextResponse } from "next/server";
import { isUserAuthorized } from "./utils/functions/is-user-authorized";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|tprc)(.*)"],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);
  const auth = req.auth;
  const currentPath = reqUrl.pathname;
  const isLoggedIn = !!auth?.user;
  const isApiAuthRoute = currentPath.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(currentPath);
  const isValidToken = isTokenValid(auth?.token);
  const isOnProtectedRoute = currentPath.startsWith(protectedRoutes);
  const isLoginRoute = currentPath.startsWith(authenticationRoutes);

  if (isApiAuthRoute) return NextResponse.next();

  if (isLoginRoute) {
    if (isLoggedIn && isValidToken) {
      return NextResponse.redirect(new URL("/dashboard", reqUrl));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn || !isValidToken) {
    return NextResponse.redirect(new URL("/login", reqUrl)); // Corrected
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", reqUrl));
  } else if (isOnProtectedRoute) {
    const canAccess = isUserAuthorized(auth?.user?.role, currentPath);

    if (!canAccess) {
      return NextResponse.redirect(new URL("/unauthorized", reqUrl));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});
