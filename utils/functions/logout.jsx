export default function logout() {
  console.log("hello");
  // Remove token from local storage
  localStorage.removeItem("accessToken");

  // Redirect to login page
  window.location.href = "/login";
}
