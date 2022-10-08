// Next Components
import Head from "next/head";

// Components
import MenuTopLeft from "../MenuTopLeft";
import MenuBotLeftMhs from "../MenuBotLeftMahasiswa";

export default function DashboardMahasiswa(props) {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center gap-5 py-10 w-3/4">
          <div className="w-1/4">
            <MenuTopLeft role="Mahasiswa" />
            <MenuBotLeftMhs />
          </div>
          <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
