import { jwtVerify } from "jose";

export async function verify(token, secret) {
  const decoded = await jwtVerify(token, secret, {});
  return decoded;
}
