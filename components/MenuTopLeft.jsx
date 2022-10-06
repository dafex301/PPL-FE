import anya from "../public/anya.jpeg";
import Image from "next/image";

export default function MenuTopLeft(props) {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex justify-start ml-3 py-3 gap-3">
        <div className="w-16">
          <Image className="rounded-full" src={anya} alt="profile-pic" />
        </div>
        <div className="text-left">
          <p className="font-bold">Anya Forger</p>
          <p className="text-sm">{props.role}</p>
          <p className="text-sm">Informatika</p>
        </div>
      </div>
    </div>
  );
}
