import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {Component.name !== "Login" && Component.name !== "Error" && <Navbar />}
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
