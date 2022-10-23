import { useState, useEffect } from "react";
import anya from "../public/anya.jpeg";
import Image from "next/image";

export default function MenuTopLeft(props) {
  const [name, setName] = useState("");
  // When get props.name, set the name to props.name
  useEffect(() => {
    setName(props.name);
  }, [props]);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex justify-start ml-3 py-3 gap-3">
        <div className="w-16">
          <Image className="rounded-full" src={anya} alt="profile-pic" />
        </div>
        <div className="text-left">
          <p className="font-bold">{name}</p>
          <p className="text-sm">{props.role}</p>
          <p className="text-sm">Informatika</p>
        </div>
      </div>
    </div>
  );
}
