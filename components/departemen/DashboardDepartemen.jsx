// Next Components
import Head from "next/head";

// Components
import MenuTopLeft from "../MenuTopLeft";
import MenuBotLeftDepartemen from "../MenuBotLeftDepartemen";

export default function DashboardDepartemen(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="flex justify-center">
        <div className="flex justify-center gap-5 py-10 w-3/4">
          <div className="w-1/4">
            <MenuTopLeft role="Departemen" name={"Informatika"} />
            <MenuBotLeftDepartemen />
          </div>
          <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            <h2 className="text-left font-bold text-2xl pl-5 pt-4">
              {props.title}
            </h2>

            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
