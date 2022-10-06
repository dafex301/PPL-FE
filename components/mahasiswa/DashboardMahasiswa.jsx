// Next Components
import Head from "next/head";

// Components
import Navbar from "../../components/Navbar";
import MenuTopLeft from "../../components/MenuTopLeft";
import MenuBotLeftMhs from "../../components/MenuBotLeftMahasiswa";

export default function DashboardMahasiswa(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex justify-center gap-5 py-10 w-3/4">
          <div className="w-1/4">
            <MenuTopLeft role="Mahasiswa" />
            <MenuBotLeftMhs />
          </div>
          <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            {props.elements}
          </div>
        </div>
      </div>
    </>
  );
}
