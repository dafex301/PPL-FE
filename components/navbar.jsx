import Image from "next/image";

// Import image
import undip from "../public/undip.png";
import anya from "../public/anya.jpeg";

// Import state react
import { useState } from "react";

// Import logout function
import logout from "../utils/functions/logout";
import Link from "next/link";

export default function Navbar() {
  // Use state profilePopUp
  const [profilePopUp, setProfilePopUp] = useState(false);

  return (
    <div>
      <div className="bg-zinc-900 justify-between items-center flex px-12 py-4 shadow-md">
        <a href="" className="text-white font-bold text-xl h-11 w-11">
          <Image src={undip} alt="Universitas Diponegoro" className="" />
        </a>
        <div className="">
          <button
            className="bg-zinc-800 border-white text-white rounded-full mr-4 w-12 flex items-center"
            id="profile"
            onClick={() => setProfilePopUp(!profilePopUp)}
          >
            <Image className="h-12 rounded-full " src={anya} alt="Robin" />
          </button>
        </div>
      </div>
      <div
        id="profile-popup"
        className={`bg-white shadow-lg rounded-xl w-36 absolute top-16 right-4 flex-row ${
          profilePopUp ? "block" : "hidden"
        }`}
        onMouseLeave={() => setProfilePopUp(false)}
      >
        <Link href="/">
          <a>
            <div className="p-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-800 rounded-t-xl">
              Profile
            </div>
          </a>
        </Link>

        <button onClick={logout} className="w-full">
          <div className="p-2 px-4 hover:bg-gray-100 cursor-pointer text-left text-gray-800 rounded-b-xl">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}
