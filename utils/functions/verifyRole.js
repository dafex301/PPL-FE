import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function verifyRole(token, role, req) {
  if (token === null) {
    console.log("hello");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Verify token
  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    // If role is not admin
    if (decoded.payload.role !== role) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
