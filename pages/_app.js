import Navbar from "../components/Navbar";
import DashboardMahasiswa from "../components/mahasiswa/DashboardMahasiswa";
import DashboardAdmin from "../components/admin/DashboardAdmin";
import DashboardDosen from "../components/dosen/DashboardDosen";
import DashboardDepartemen from "../components/departemen/DashboardDepartemen";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const route = useRouter();

  return (
    <>
      {Component.name !== "Login" && Component.name !== "Error" && <Navbar />}

      {route.pathname.includes("/mahasiswa") ? (
        <DashboardMahasiswa>
          <Component {...pageProps} />
        </DashboardMahasiswa>
      ) : route.pathname.includes("/admin") ? (
        <DashboardAdmin>
          <Component {...pageProps} />
        </DashboardAdmin>
      ) : route.pathname.includes("/dosen") ? (
        <DashboardDosen>
          <Component {...pageProps} />
        </DashboardDosen>
      ) : route.pathname.includes("/departemen") ? (
        <DashboardDepartemen>
          <Component {...pageProps} />
        </DashboardDepartemen>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
