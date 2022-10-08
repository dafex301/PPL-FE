export default function logout() {
  // Remove access token from localStorage
  localStorage.removeItem("accessToken");
  // Redirect to login page
  window.location.href = "/login";
}
