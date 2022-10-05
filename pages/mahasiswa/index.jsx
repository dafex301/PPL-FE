// Import navbar
import Image from "next/image";
import Navbar from "../../components/Navbar";
import MenuTopLeft from "../../components/MenuTopLeft";
import MenuBotLeftMhs from "../../components/MenuBotLeftMahasiswa";
import anya from "../../public/anya.jpeg";

export default function HomeMahasiswa() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex justify-center gap-5 py-10 w-3/4">
          <div className="w-1/4">
            <MenuTopLeft />
            <MenuBotLeftMhs />
          </div>
          <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-left font-bold text-2xl pl-5 pt-4">Profil</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
