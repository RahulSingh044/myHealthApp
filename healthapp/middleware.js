import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Lightweight JWT verification library

// Define which routes need protection
const protectedRoutes = ["/patient", "/emergencyAccess", "/medication", "/records"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (err) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }
}
