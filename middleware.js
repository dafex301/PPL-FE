import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import verify from "./utils/functions/verify";

export async function middleware(req) {
  let res = NextResponse.next();
  const token = req.cookies.get("accessToken");

  // If route is /
  if (req.nextUrl.pathname === "/") {
    // If token is not null
    if (token !== null) {
      // Verify token
      try {
        const decoded = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.SECRET_KEY)
        );

        return NextResponse.redirect(
          new URL(`/${decoded.payload.role}`, req.url)
        );
      } catch (error) {
        return res;
      }
    }
  }

  //   If route is /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return await verify(token, "admin", req);
  }

  // If route is /mahasiswa/irs
  if (req.nextUrl.pathname.startsWith("/mahasiswa/irs")) {
    return await verify(token, "mahasiswa", req, true);
  }

  // If route is /mahasiswa/khs
  if (req.nextUrl.pathname.startsWith("/mahasiswa/khs")) {
    return await verify(token, "mahasiswa", req, true);
  }

  // If route is /mahasiswa/pkl
  if (req.nextUrl.pathname.startsWith("/mahasiswa/pkl")) {
    return await verify(token, "mahasiswa", req, true);
  }

  // If route is /mahasiswa/skripsi
  if (req.nextUrl.pathname.startsWith("/mahasiswa/skripsi")) {
    return await verify(token, "mahasiswa", req, true);
  }

  //   If route is /mahasiswa
  if (req.nextUrl.pathname.startsWith("/mahasiswa")) {
    return await verify(token, "mahasiswa", req);
  }

  //   If route is /departemen
  if (req.nextUrl.pathname.startsWith("/departemen")) {
    return await verify(token, "departemen", req);
  }

  //   If route is /dosen
  if (req.nextUrl.pathname.startsWith("/dosen")) {
    return await verify(token, "dosen", req);
  }

  return res;
}
