import { deleteCookie } from "cookies-next";

export default function logout() {
  // Remove accessToken from cookie
  deleteCookie("accessToken");

  // Redirect to login page
  window.location.href = "/";
}
