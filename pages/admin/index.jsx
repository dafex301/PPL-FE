import Head from "next/head";

export default function HomeAdmin() {
  // Check if user is logged in
  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken") === null) {
      window.location.href = "/login";
    }
  }
  return (
    <>
      <Head>
        <title>Home Admin</title>
      </Head>
      Selamat datang, Admin
    </>
  );
}
