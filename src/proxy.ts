//^ may be rename to proxy.ts in the future
// @ here not client and not server

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/allorders", "/cart", "/profile", "/wishlist"];
const authRoute = ["/register", "/login"];
export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  //& use it only when U have req like route Handler

  if (protectedRoute.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
      //& '.next()' here to go to path that user want to go before check
    } else {
      const redirectURL = new URL("/login", process.env.BASE_URL);
      //& BASE_URL = http://localhost:3000/

      redirectURL.searchParams.set("url", req.nextUrl.pathname);
      return NextResponse.redirect(redirectURL);
    }
  }

  if (authRoute.includes(req.nextUrl.pathname)) {
    if (token) {
      const redirectURL = new URL("/", process.env.BASE_URL);

      return NextResponse.redirect(redirectURL);
    } else {
      return NextResponse.next();
    }
  }
}
